import { v4 as uuidv4 } from 'uuid';

import {
	storeData,
	getData,
} from './StorageData';

const KEY = 'ChatDeviceKId';

export async function generateDeviceId() {
	let uuid;
	uuid = await getData(KEY);
	if (!uuid) {
		uuid = uuidv4();
		await storeData(uuid, KEY);
	}
	return uuid;
}

export default {};
