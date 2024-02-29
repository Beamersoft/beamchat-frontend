import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8, // Added padding for the container
		backgroundColor: '#FFF', // Optional: Change as per your app's theme
		borderRadius: 25, // Rounded corners for the container
		shadowColor: '#000', // Shadow for the container
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginBottom: 3,
	},
	input: {
		width: '82%',
		padding: 1, // Added padding inside the input
		borderRadius: 25, // Rounded corners for the input field
		backgroundColor: '#F0F0F0', // Light background color for the input field
		marginRight: 8, // Added margin to separate input and button
	},
	sendButton: {
		backgroundColor: '#0078D4', // A more vibrant color
		borderRadius: 25, // Fully rounded corners
		paddingVertical: 10, // Vertical padding
		paddingHorizontal: 10, // Horizontal padding
		elevation: 2, // Shadow effect
		shadowColor: '#000', // Shadow color
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
});

export default styles;
