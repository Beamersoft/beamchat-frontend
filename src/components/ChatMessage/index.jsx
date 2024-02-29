import { View } from 'react-native';
import Text from '../Text';
import styles from './styles';

function ChatMessage({
	isOwnMessage,
	message,
}) {
	return (
		<View style={[
			styles.messageBubble,
			isOwnMessage ? styles.myMessage : styles.theirMessage,
		]}
		>
			<Text style={styles.messageText}>{message.text}</Text>
		</View>
	);
}

export default ChatMessage;
