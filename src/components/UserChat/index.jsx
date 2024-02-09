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
			{(chat?.participantsId) ? chat?.participantsId.map((id) => {
				if (id !== userId) {
					return (
						<Text
							key={id}
							style={styles.chatItemText}
						>
							{`${users[id]?.firstName || chat.chatId} ${users[id]?.lastName || ''}`}
							{' '}
						</Text>
					);
				}
				return null;
			}) : null}
		</TouchableOpacity>
	);
}

export default UserChat;
