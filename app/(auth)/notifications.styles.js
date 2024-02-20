import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
	},
	notificationItem: {
		backgroundColor: '#f9f9f9',
		padding: 20,
		marginVertical: 8,
		borderRadius: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
	},
	notificationType: {
		fontWeight: 'bold',
		fontSize: 16,
		marginBottom: 5,
	},
	notificationDate: {
		fontSize: 14,
		color: '#666',
		marginBottom: 5,
	},
	statusChip: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 15,
		alignSelf: 'flex-start',
		marginBottom: 10,
	},
	chipText: {
		color: '#fff',
		fontSize: 12,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	button: {
		marginLeft: 10,
		padding: 10,
	},
});

export default styles;
