import { TouchableOpacity } from 'react-native';

import Text from '../Text';
import styles from './styles';

function UserChat({
	userId,
	chat,
	users,
	navigateToChat,
}) {
	return (
		<TouchableOpacity style={styles.chatItem} onPress={() => navigateToChat(chat)}>
			{(chat?.participants && chat?.participants.length > 1) ? chat?.participants.map((participant) => {
				if (participant.id !== userId) {
					return (
						<Text
							key={participant.id}
							style={styles.chatItemText}
						>
							{`${users[participant.id]?.firstName || chat.chatId} ${users[participant.id]?.lastName || ''}`}
							{' '}
						</Text>
					);
				}
				return null;
			}) : null}
			{(chat?.participants && chat?.participants.length === 1 && chat?.participants[0].id === userId) ? (
				<Text
					style={styles.chatItemText}
				>
					{'New chat'}
					{' '}
				</Text>
			) : null}
		</TouchableOpacity>
	);
}

export default UserChat;
