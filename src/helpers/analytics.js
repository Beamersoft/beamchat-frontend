import {
	Platform,
	Dimensions,
} from 'react-native';

import Constants from 'expo-constants';
import * as Application from 'expo-application';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';

import jwtDecode from 'jwt-decode';

import { generateDeviceId } from './deviceid';
import { debugLog } from '../api/debug';

import {
	getData,
	storeData,
	sessionIdTokenLocalKey,
} from './StorageData';

let deviceID = null;

async function getDeviceID() {
	if (!deviceID) {
		deviceID = await generateDeviceId();
	}
	return deviceID;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

async function registerDebugAction(source = '', metadata = {}) {
	try {
		const userEmail = await getData('userEmail');
		if (metadata?.properties?.view) {
			await storeData(metadata.screenName || metadata.event, 'actualScreen');
		}

		const data = {
			deviceID: await getDeviceID(),
			userEmail,
			source,
			...metadata,
			platform: Platform.OS,
			deviceName: Constants.deviceName,
			'app-version': Constants.expoConfig.version,
			'app-name': Constants.expoConfig.extra.APP_NAME,
			env: Constants.manifest.extra.NODE_ENV,
			windowWidth,
			windowHeight,
			totalMemory: Device.totalMemory,
			osVersion: Device.osVersion,
			modelName: Device.modelName,
			isDevice: Device.isDevice,
		};

		if (Platform.OS === 'android') {
			data.lastUpdateFromStore = await Application.getLastUpdateTimeAsync();
			// data.platformFeatures = await Device.getPlatformFeaturesAsync();
		}
		if (!(Platform.OS === 'ios' && !Device.isDevice)) {
			const batteryLevel = await Battery.getBatteryLevelAsync();
			data.batteryLevel = batteryLevel;
		}
		debugLog(data);
	} catch (err) {
		console.info('Error saving debug log: ', err);
	}
}

export async function track(event, properties = {}, source = 'segment') {
	try {
		if (source === 'analytics') {
			let screenName = null;
			let eventName = event;

			const localToken = await getData(sessionIdTokenLocalKey);
			let userId = '';
			if (!event) {
				eventName = 'userInteraction';
			}

			if (localToken) {
				const decoded = jwtDecode(localToken.jwt);
				userId = decoded['custom:user_id'];
			}

			if (properties.screenName) {
				screenName = properties.screenName;
			} else {
				const tmpScreenName = await getData('actualScreen');
				if (tmpScreenName) {
					screenName = tmpScreenName;
				}
			}

			if (!screenName) screenName = event;

			registerDebugAction('track-analytics', {
				event: eventName,
				screenName,
				properties: {
					...properties,
					screenName,
				},
				userId,
			});
		}
	} catch (err) {
		console.info('[Analytics] track Error: ', err);
	}
}

export async function identify(userId, traits) {
	registerDebugAction('identify', {
		userId,
		traits,
	});
}

export async function screen(name = 'no-defined', data = {}, source = 'segment') {
	try {
		if (source !== 'segment') {
			registerDebugAction('screen-analytics', {
				name,
				...data,
			});
		}
	} catch (err) {
		console.info('[Analytics] screen error: ', err);
	}
}
