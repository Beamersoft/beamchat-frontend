import React from 'react';

import {
	FlatList,
	View,
	TouchableOpacity,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

import Screen from '../../src/components/Screen';
import Text from '../../src/components/Text';

import styles from './notifications.styles';
import formatDate from '../../src/helpers/dates';
import { acceptChatInvite } from '../../src/api/chats';
import { generatePairOfKeys } from '../../src/helpers/crypto';
import { secureStoreData } from '../../src/helpers/SecureStorageData';

function Notifications() {
	const { notifications } = useLocalSearchParams();

	async function handleAccept(item) {
		if (item.type === 'NOTIFICATION_CHAT_INVITE') {
			let privateKey;
			try {
				const keys = generatePairOfKeys();
				privateKey = keys.privateKey;
				delete keys.privateKey;

				const res = await acceptChatInvite(item.chatId, keys.publicKey);

				if (res) {
					await secureStoreData(privateKey, `prik-${res.chatId}`);
					router.navigate({ pathname: 'home' });
					// TODO: Show success
				} else {
					// TODO: Show error
				}
			} catch (err) {
				console.info('Err handleAccept ', err.message, ' in notifications.jsx');
			} finally {
				privateKey = null;
			}
		}
	}

	const handleReject = (id) => {};

	const renderStatusChip = (status) => {
		let backgroundColor = '#FFC107';
		if (status === 'accepted') backgroundColor = '#4CAF50';
		else if (status === 'rejected') backgroundColor = '#F44336';

		return (
			<View style={[styles.statusChip, { backgroundColor }]}>
				<Text style={styles.chipText}>{status.toUpperCase()}</Text>
			</View>
		);
	};

	return (
		<Screen safe={false} style={styles.screen}>
			<FlatList
				data={JSON.parse(notifications)}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<View style={styles.notificationItem}>
						<Text style={styles.notificationType}>{item.type.replace('NOTIFICATION_', '').replace('_', ' ').toLowerCase()}</Text>
						<Text style={styles.notificationDate}>{formatDate(new Date(item.sentAt))}</Text>
						{renderStatusChip(item.status)}
						{item.status === 'pending' ? (
							<View style={styles.buttonContainer}>
								<TouchableOpacity onPress={() => handleAccept(item)} style={styles.button}>
									<Icon name="check" size={20} color="#4CAF50" />
								</TouchableOpacity>
								<TouchableOpacity onPress={() => handleReject(item)} style={styles.button}>
									<Icon name="times" size={20} color="#F44336" />
								</TouchableOpacity>
							</View>
						) : null}
					</View>
				)}
			/>
		</Screen>
	);
}

export default Notifications;
