import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	messageBubble: {
		padding: 10,
		borderRadius: 20,
		marginVertical: 4,
		maxWidth: '80%',
	},
	myMessage: {
		backgroundColor: '#DCF8C6',
		alignSelf: 'flex-end',
		marginRight: 10,
	},
	theirMessage: {
		backgroundColor: '#ECECEC',
		alignSelf: 'flex-start',
		marginLeft: 10,
	},
	messageText: {
		fontSize: 16,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {

	},
	sendButton: {
		backgroundColor: '#0078D4', // MSN blue
		borderRadius: 20,
	},
});

export default styles;
