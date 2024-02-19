import {
	useContext,
	useEffect,
	useState,
} from 'react';

import {
	FlatList,
} from 'react-native';

import {
	Stack,
	router,
} from 'expo-router';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Button from '../../src/components/Button';
import { createChat, getChats } from '../../src/api/chats';
import styles from './home.styles';
import UserChat from '../../src/components/UserChat';
import FloatingButton from '../../src/components/FloatingButton';
import Text from '../../src/components/Text';
import CreateChat from '../../src/main/home/CreateChat';
import { generatePairOfKeys } from '../../src/helpers/crypto';
import { secureStoreData } from '../../src/helpers/SecureStorageData';

export default function Home() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const [chats, setChats] = useState();
	const [users, setUsers] = useState();
	const [openCreateChat, setOpenCreateChat] = useState(false);
	const [loadingAddChat, setLoadingAddChat] = useState(false);
	const [errorCreateChat, setErrorCreateChat] = useState(null);

	const {
		logout,
		userData,
	} = context;

	async function getAllChats() {
		try {
			const res = await getChats();

			if (res?.chats) {
				setChats(res.chats);
			}

			if (res?.users) {
				setUsers(res.users);
			}
			return null;
		} catch (err) {
			return console.info('Err getAllChats ', err, ' in home.jsx');
		}
	}

	function navigateToChat(chat) {
		const { chatId, participants } = chat;
		router.navigate({ pathname: 'chat', params: { chatId, participants: JSON.stringify(participants) } });
	}

	function onOpenChat() {
		setOpenCreateChat(true);
		setErrorCreateChat(null);
	}

	async function onCreateChat(invitedEmail) {
		let privateKey;
		try {
			setLoadingAddChat(true);
			const keys = generatePairOfKeys();
			privateKey = keys.privateKey;
			delete keys.privateKey;

			const res = await createChat(invitedEmail, keys.publicKey);

			if (res && res.chatId) {
				await secureStoreData(privateKey, `prik-${res.chatId}`);
				// TODO: Show success
			} else {
				// TODO: Show error
			}
			setOpenCreateChat(false);
		} catch (err) {
			console.info('Err createChat ', err.message, ' in home.jsx');
			setErrorCreateChat(err.message);
		} finally {
			privateKey = null;
			setLoadingAddChat(false);
			await getAllChats();
		}
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
			{(chats && users) ? (
				<FlatList
					data={chats}
					keyExtractor={(item) => item.chatId}
					renderItem={({ item }) => (
						<UserChat
							userId={userData?._id || ''}
							chat={item}
							users={users}
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
			<FloatingButton
				onPress={() => onOpenChat()}
			/>
			<CreateChat
				visible={openCreateChat}
				onPress={(email) => onCreateChat(email)}
				onRequestClose={() => setOpenCreateChat(false)}
				loading={loadingAddChat}
				errorMessage={errorCreateChat}
			/>
		</Screen>
	);
}
