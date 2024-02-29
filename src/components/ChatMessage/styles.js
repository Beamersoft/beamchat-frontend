import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	messageBubble: {
		padding: 10,
		borderRadius: 20,
		marginVertical: 4,
		maxWidth: '80%',
	},
	myMessage: {
		backgroundColor: '#DCF8D0',
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
});

export default styles;
