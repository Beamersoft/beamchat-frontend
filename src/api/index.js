import Constants from 'expo-constants';
import axios from 'axios';
import { Platform } from 'react-native';

import {
	sessionLocalKey,
	getData,
	sessionIdTokenLocalKey,
	storeData,
} from '../helpers/StorageData';

import CustomError from '../helpers/customerrors';

const config = {
	ENDPOINT_URL: `${Constants.expoConfig.extra.API_URL}`,
	UPLOAD_URL: 'https://someone.com/core/upload',
};

const BASE_URL = config.ENDPOINT_URL;

let total401 = 0;
export default async function api(params, useIdToken = false, version = '1', saveLog = true) {
	// const requestUUID = uuidv4();

	const controller = new AbortController();
	const localParams = { ...params.query };
	let localtoken = await getData(sessionLocalKey);
	if (useIdToken) {
		localtoken = await getData(sessionIdTokenLocalKey);
	}

	const finalHeaders = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'user-agent': 'YoCripto',
		'x-version': version,
		'app-version': Constants.expoConfig.version,
		'app-name': Constants.expoConfig.extra.APP_NAME,
	};

	if (localtoken) finalHeaders.authorization = `Bearer ${localtoken.jwt}`;
	if (params.headers) {
		Object.keys(params.headers).forEach((k) => {
			(finalHeaders[k] = params.headers[k]);
			return true;
		});
	}

	if (params['no-bearer']) {
		delete finalHeaders.authorization;
	}
	const optionsAxios = {
		method: params.method.toLowerCase(),
		url: `${[params.microservice, params.module].filter((p) => p !== '').join('/')}`,
		params: localParams,
		baseURL: params.host || BASE_URL,
		timeout: params.timeout || 60000,
		headers: { ...finalHeaders },
		signal: params?.controller?.signal || controller.signal,
	};
	if (params.data && Object.keys(params.data).length > 0) optionsAxios.data = params.data;

	const instance = axios.create(optionsAxios);
	// const startTime = new Date();
	try {
		const response = await instance.request(optionsAxios);

		if (response.data) {
			try {
				JSON.stringify(response.data);
			} catch (err) {
				console.info('ERROR PARSING THROW ERROR');
			}
		}
		return response;
	} catch (err) {
		console.info('Error lib API: network error: ', err?.response?.status || 'NO_STATUS', err?.response?.data || 'NO_BODY');
		const errorData = {
			status: err?.response?.status || 'NO_STATUS',
			message: err.response?.data?.message ? err?.response?.data?.message : err?.response?.data,
			data: err?.response?.data,
		};

		if (err.response?.status === 403 || err.response?.status === 401) {
			total401 += 1;
			if (total401 === 1) {
				total401 = 0;
				await storeData(true, 'loggedOut');
			}
		} else {
			total401 = 0;
		}

		throw new CustomError({
			...errorData,
		});
	}
}

export async function uploadFile(file, folder, props = {}) {
	try {
		const oData = new FormData();
		console.info('uploading file: ', file, folder);
		const {
			uri,
		} = file;

		const extension = uri.split('.').pop();
		const fileName = uri.split('/').pop();
		let mime = '';
		switch (extension) {
		case 'jpg':
			mime = 'image/jpg';
			break;
		case 'jpeg':
			mime = 'image/jpg';
			break;
		case 'png':
			mime = 'image/png';
			break;
		default:
			mime = 'image/jpg';
		}
		oData.append('folder', folder);

		// append extra props
		Object.keys(props).forEach((key) => {
			oData.append(key, props[key]);
		});

		oData.append('upfile', {
			name: fileName,
			uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
			type: mime,
		});

		const localtoken = await getData(sessionLocalKey);
		const requestData = {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'multipart/form-data',
				'token-application': config.APPLICATION_TOKEN,
				Authorization: `Bearer: ${localtoken.jwt}`,
			},
			body: oData,
		};
		const response = await fetch(config.UPLOAD_URL, requestData);
		return response.json();
	} catch (err) {
		console.info('Error uploading file: ', err);
		throw new Error(err);
	}
}

export async function uploadFileBase64(file) {
	try {
		const {
			uri,
		} = file;

		const extension = uri.split('.').pop();

		let mime = '';
		switch (extension) {
		case 'jpg':
			mime = 'image/jpg';
			break;
		case 'jpeg':
			mime = 'image/jpg';
			break;
		case 'png':
			mime = 'image/png';
			break;
		default:
			mime = 'image/jpg';
		}

		const response = await api({
			microservice: '/files',
			module: '',
			method: 'post',
			data: {
				data: file.base64,
				sizes: ['900x900', '120x120', '640x640'],
				type: mime,
			},
		});
		return response.data;
	} catch (err) {
		console.info('Error uploadFile file: ', err.toString());
	}
	return null;
}
