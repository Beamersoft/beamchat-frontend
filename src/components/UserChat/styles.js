import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 20, // Provides padding around the entire screen content
		backgroundColor: '#F5F5F5', // A light grey background
	},
	headerTitle: {
		fontWeight: 'bold',
	},
	welcomeMessage: {
		marginBottom: 20,
		fontSize: 20,
		fontWeight: 'normal',
		color: '#333', // Darker text for better readability
	},
	chatItem: {
		backgroundColor: '#FFF', // White background for chat items
		padding: 15,
		borderRadius: 5,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5, // Adds shadow for elevation effect
	},
	chatItemText: {
		color: '#0078D4', // MSN's iconic blue for interactive elements
	},
	chatList: {
		flexGrow: 1,
	},
	logoutButton: {
		marginTop: 'auto', // Pushes the logout button to the bottom of the screen
		backgroundColor: '#0078D4', // MSN blue for the button
		color: '#FFFFFF', // White text
		padding: 10,
		borderRadius: 5,
	},
});

export default styles;
