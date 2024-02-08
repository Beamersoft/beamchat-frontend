import {
	Stack, router,
} from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Button from '../../src/components/Button';
import { getChats } from '../../src/api/chats';
import Text from '../../src/components/Text';

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
		<Screen>
			<Stack.Screen
				options={{
					title: 'Home',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					headerTitle: 'Home',
				}}
			/>
			<Text
				size="regular-20"
				style={{
					marginBottom: 20,
				}}
			>
				{`Hi ${userData?.firstName || ''}! below you see your chats`}
			</Text>
			{chats ? chats.map((chat) => (
				<Text
					key={chat.chatId}
					color="#000"
					onPress={() => navigateToChat(chat)}
				>
					{chat.chatId}
				</Text>
			)) : null}
			<Button
				label={`${t('LOGOUT')}`}
				color="white10"
				onPress={() => logout()}
				style={{
					marginTop: 300,
				}}
			/>
		</Screen>
	);
}
