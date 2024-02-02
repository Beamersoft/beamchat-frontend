import AsyncStorage from '@react-native-async-storage/async-storage';

export const localKey = 'beamCh4tk$$$';

export const sessionLocalKey = 'BeamCh4tK1ys';
export const sessionIdTokenLocalKey = 'idTokenYC';
export const sessionRefreshTokenLocalKey = 'refreshTokenYC';

export async function storeData(value, key = localKey) {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(`@${key}`, jsonValue);
	} catch (e) {
		console.info('Error storeData method: ', e);
	}
}

export async function getData(key = localKey) {
	try {
		const value = await AsyncStorage.getItem(`@${key}`);
		if (value !== null) {
			return JSON.parse(value);
		}
	} catch (e) {
		console.info('Error getting Data: ', e);
	}
	return null;
}

export async function clearData(key = localKey) {
	try {
		await AsyncStorage.removeItem(`@${key}`);
	} catch (err) {
		console.info('clearData error: ', err);
	}
}

export async function clearAllLocalStorage() {
	try {
		const keys = [
			'@userData',
		];
		await AsyncStorage.multiRemove(keys);
	} catch (e) {
		console.info('Error clearling: ', e);
	}
}
