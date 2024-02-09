import {
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	Stack,
	router,
} from 'expo-router';
import { useTranslation } from 'react-i18next';

import {
	FlatList,
	TouchableOpacity,
} from 'react-native';
import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Button from '../../src/components/Button';
import { getChats } from '../../src/api/chats';
import Text from '../../src/components/Text';
import styles from './home.styles';

export default function Home() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const [chats, setChats] = useState([]);

	const {
		logout,
		userData,
	} = context;

	async function getAllChats() {
		try {
			const res = await getChats();

			if (res && res.chats) {
				return setChats(res.chats);
			}
			return null;
		} catch (err) {
			return console.info('Err getAllChats ', err, ' in home.jsx');
		}
	}

	function navigateToChat(chat) {
		const { chatId, participantsId } = chat;
		router.navigate({ pathname: 'chat', params: { chatId, participantsId } });
	}

	useEffect(() => {
		console.info('CONTEXT HOME ====> ', context);
		getAllChats();
	}, []);

	return (
		<Screen safe={false} style={styles.screen}>
			<Stack.Screen
				options={{
					title: 'Home',
					headerTitleStyle: styles.headerTitle,
				}}
			/>
			<Text style={styles.welcomeMessage}>
				{`Hi ${userData?.firstName || ''}! Below you see your chats:`}
			</Text>
			<FlatList
				data={chats}
				keyExtractor={(item) => item.chatId}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.chatItem} onPress={() => navigateToChat(item)}>
						<Text style={styles.chatItemText}>
							{item.chatId}
							{' '}
							{/* Consider showing a more descriptive name or last message */}
						</Text>
					</TouchableOpacity>
				)}
				contentContainerStyle={styles.chatList}
			/>
			<Button
				label={`${t('LOGOUT')}`}
				onPress={() => logout()}
				style={styles.logoutButton}
			/>
		</Screen>
	);
}
