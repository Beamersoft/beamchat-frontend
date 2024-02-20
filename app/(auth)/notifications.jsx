import React from 'react';

import {
	FlatList,
	View,
	TouchableOpacity,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

import Screen from '../../src/components/Screen';
import Text from '../../src/components/Text';

import styles from './notifications.styles';
import formatDate from '../../src/helpers/dates';

function Notifications() {
	const { notifications } = useLocalSearchParams();

	// Function to handle accept
	const handleAccept = (id) => {
		console.log('Accept', id);
		// Implement your accept logic here
	};

	// Function to handle reject
	const handleReject = (id) => {
		console.log('Reject', id);
		// Implement your reject logic here
	};

	// Function to render the status chip
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
						<View style={styles.buttonContainer}>
							<TouchableOpacity onPress={() => handleAccept(item._id)} style={styles.button}>
								<Icon name="check" size={20} color="#4CAF50" />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => handleReject(item._id)} style={styles.button}>
								<Icon name="times" size={20} color="#F44336" />
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		</Screen>
	);
}

export default Notifications;
