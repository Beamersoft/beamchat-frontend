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
		padding: 8,
		backgroundColor: '#FFF',
		borderRadius: 25,
		shadowColor: '#000',
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
		padding: 1,
		borderRadius: 25,
		backgroundColor: '#F0F0F0',
		marginRight: 8,
	},
	sendButton: {
		backgroundColor: '#0078D4',
		borderRadius: 25,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
});

export default styles;
