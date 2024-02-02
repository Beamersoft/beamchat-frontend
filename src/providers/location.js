import * as Location from 'expo-location';
import Geolocation from 'react-native-geolocation-service';

import {
	track,
} from '../helpers/analytics';

function getLocationWrap() {
	return new Promise((resolve, reject) => {
		Geolocation.getCurrentPosition(
			(position) => resolve(position),
			(error) => reject(error),
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	});
}

export async function getLocationAsync() {
	try {
		const { status } = await Location.requestForegroundPermissionsAsync();
		track('location-services', {
			status,
		}, 'analytics');

		const finalLocation = await getLocationWrap();
		return finalLocation;
	} catch (err) {
		return null;
	}
}

let processGPS = false;

export async function getLocation() {
	let location = null;
	try {
		// if (processGPS) return null;
		processGPS = true;
		location = await getLocationAsync();
		if (!location) {
			console.info('sacando la ultima conocida');
			location = await Location.getLastKnownPositionAsync();
			track('location-services', {
				location,
			}, 'analytics');
			console.info('obtenida la ultima conocida: ', location);
		}
		processGPS = false;
	} catch (err) {
		processGPS = false;
	}
	return location;
}

export default getLocation;
