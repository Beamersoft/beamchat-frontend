import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0', // Light grey background
	},
	input: {
		width: '100%',
		marginVertical: 10,
		borderRadius: 5,
		borderColor: '#cccccc', // Light grey border
		borderWidth: 1,
		backgroundColor: '#ffffff', // White background for input
	},
	button: {
		marginTop: 20,
		backgroundColor: '#0078D4', // A vibrant blue color for the button
		padding: 15,
		borderRadius: 5,
		width: '100%',
		alignItems: 'center',
	},
	buttonText: {
		color: '#ffffff', // White color text
		fontWeight: 'bold',
	},
	link: {
		marginVertical: 20,
	},
	linkText: {
		color: '#0078D4', // Same as button color for consistency
		textDecorationLine: 'underline',
	},
});

export default styles;
