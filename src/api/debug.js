import {
	Platform,
	Dimensions,
} from 'react-native';

import * as Device from 'expo-device';
import * as Battery from 'expo-battery';
import Constants from 'expo-constants';

import api from './index';
import { generateDeviceId } from '../helpers/deviceid';

let deviceID = null;
async function getDeviceID() {
	if (!deviceID) {
		deviceID = await generateDeviceId();
	}
	return deviceID;
}

export async function debugLog(data = {}) {
	try {
		// TODO: Hit the proper debug server
		const response = await api({
			host: 'https://mocks.playgroundmania.com',
			microservice: 'core',
			headers: {
				'x-yocripto-key': '002xFsk2AAK2-299289%22910239120anShasdAD@2ihnda#@99a9sasdl@@kasd828n',
			},
			module: 'debug',
			method: 'PUT',
			data,
		}, false, 1, false);
		if (response.data) return response.data?.data;
	} catch (err) {
		console.err('debugLog error status: ', err.status, ' -- message: ', err.message);
		throw err;
	}
}

export async function validateDebugActivationCode(code) {
	try {
		const response = await api({
			host: 'https://mocks.playgroundmania.com',
			microservice: 'core',
			module: 'activationCode',
			headers: {
				'x-yocripto-key': '002xFsk2AAK2-299289%22910239120anShasdAD@2ihnda#@99a9sasdl@@kasd828n',
			},
			method: 'get',
			query: {
				code,
			},
		});

		if (response.data) return response.data;
		throw new Error('Lib validateDebugActivationCode no data');
	} catch (err) {
		console.info('validateDebugActivationCode error: ', err.status, err.message);
		throw err;
	}
}

export async function pixel(userId) {
	try {
		const windowWidth = Dimensions.get('window').width;
		const windowHeight = Dimensions.get('window').height;

		const data = {
			tag: 'device-info',
			version: '1',
			payload: {
				user_id: userId,
				device_id: await getDeviceID(),
				device_name: Constants.deviceName,
				model_name: Device.modelName,
				platform: Platform.OS,
				os_version: Device.osVersion,
				is_device: Device.isDevice,
				app_version: Constants.expoConfig.version,
				app_name: Constants.expoConfig.owner,
				total_memory: Device.totalMemory,
				window_height: windowHeight,
				window_width: windowWidth,
			},
		};

		if (!(Platform.OS === 'ios' && !Device.isDevice)) {
			const batteryLevel = await Battery.getBatteryLevelAsync();
			data.payload.battery = batteryLevel;
		}
		await api({
			host: Constants.expoConfig.extra.PIXEL_HOST,
			microservice: 'tracking',
			module: 'pxl.png',
			method: 'get',
			query: {
				x: btoa(JSON.stringify(data)),
			},
		});
	} catch (err) {
		console.info('pixel error: ', err.status, err.message);
	}
}
