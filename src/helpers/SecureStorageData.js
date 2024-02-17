import * as SecureStore from 'expo-secure-store';

const localKey = 'S3cur3D@ta';

export async function secureStoreData(value, key = localKey) {
	try {
		await SecureStore.setItemAsync(key, value);
	} catch (err) {
		console.info('Error secureStoreData method ', err, ' in SecureStorageData.js');
	}
}

export async function secureGetData(key = localKey) {
	try {
		const result = await SecureStore.getItemAsync(key);
		if (result) {
			return result;
		}
	} catch (err) {
		console.info('Error secureGetData method ', err, ' in SecureStorageData.js');
	}
	return null;
}
