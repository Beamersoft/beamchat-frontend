import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {
	Platform,
} from 'react-native';

import { getAndUpdateNotificationToken } from '../helpers/notifications';

async function registerForPushNotificationsAsync() {
	const token = await getAndUpdateNotificationToken();

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			// vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}
	return token;
}

async function initNotifications() {
	const token = await registerForPushNotificationsAsync();

	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: false,
		}),
	});

	Notifications.addNotificationReceivedListener(async (notification) => {
		/*
		await Notifications.scheduleNotificationAsync({
			content: {
				title: notification.request.content.title || '',
				body: notification.request.content.body || '',
			},
			trigger: {
				seconds: 1,
				channelId: 'default',
			},
		});
		*/
	});

	Notifications.addNotificationResponseReceivedListener((response) => {

	});
	return token;
}

export default initNotifications;
