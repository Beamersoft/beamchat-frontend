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
} from 'react-native';
import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Button from '../../src/components/Button';
import { getChats } from '../../src/api/chats';
import Text from '../../src/components/Text';
import styles from './home.styles';
import UserChat from '../../src/components/UserChat';

export default function Home() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const [data, setData] = useState();

	const {
		logout,
		userData,
	} = context;

	async function getAllChats() {
		try {
			const res = await getChats();

			if (res) {
				return setData(res);
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
			{(data && data?.chats && data?.users) ? (
				<FlatList
					data={data?.chats}
					keyExtractor={(item) => item.chatId}
					renderItem={({ item }) => (
						<UserChat
							userId={userData._id}
							chat={item}
							users={data.users}
							navigateToChat={() => navigateToChat(item)}
						/>
					)}
					contentContainerStyle={styles.chatList}
				/>
			) : null}
			<Button
				label={`${t('LOGOUT')}`}
				onPress={() => logout()}
				style={styles.logoutButton}
			/>
		</Screen>
	);
}
