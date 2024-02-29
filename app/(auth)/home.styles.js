import { StyleSheet } from 'react-native';
import Colors from '../../src/themes/colors';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#F5F5F5', // Light background for the entire screen
	},
	header: {
		padding: 20,
		backgroundColor: Colors.primary.blue30, // Consider using your app's primary color
		color: '#FFFFFF',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	userSection: {
		flexDirection: 'row', // Aligns items in a row
		alignItems: 'center', // Centers items vertically in the container
		justifyContent: 'space-between',
		marginBottom: 20, // Adds some space below the user section
		padding: 10, // Adds padding inside the user section
	},
	userProfilePic: {
		width: 40,
		height: 40,
		borderRadius: 20, // Circular profile picture
		marginRight: 10,
	},
	logoutButton: {
		backgroundColor: '#0078D4', // MSN blue for the button
		color: '#FFFFFF', // White text
		padding: 10,
		borderRadius: 5,
		marginRight: 10, // Adds spacing between the logout button and the badge/notification icon
	},
	badgeStyle: {
		// Example style, adjust as needed for your Badge component
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#0078D4', // You might want to match this with your app's theme
	},
	content: {
		padding: 20,
		// Styles for the main content go here
	},
	// Add any other styles for buttons, text, etc, that are part of your home page
});

export default styles;
