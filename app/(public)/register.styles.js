import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
	},
	input: {
		width: '100%',
		marginVertical: 10,
		borderRadius: 5,
		borderColor: '#cccccc',
		borderWidth: 1,
		backgroundColor: '#ffffff',
	},
	button: {
		marginTop: 20,
		backgroundColor: '#0078D4',
		padding: 15,
		borderRadius: 5,
		width: '100%',
		alignItems: 'center',
	},
	buttonText: {
		color: '#ffffff',
		fontWeight: 'bold',
	},
	link: {
		marginVertical: 20,
	},
	linkText: {
		color: '#0078D4',
		textDecorationLine: 'underline',
	},
	error: {
		marginVertical: 10,
	},
});

export default styles;
