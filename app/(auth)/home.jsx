import {
	useContext,
	useState,
	useCallback,
} from 'react';

import {
	FlatList,
	View,
} from 'react-native';

import {
	Stack,
	router,
	useFocusEffect,
} from 'expo-router';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import {
	createChat,
	getChats,
} from '../../src/api/chats';
import styles from './home.styles';
import UserChat from '../../src/components/UserChat';
import FloatingButton from '../../src/components/FloatingButton';
import CreateChat from '../../src/main/home/CreateChat';
import { generatePairOfKeys } from '../../src/helpers/crypto';
import { secureStoreData } from '../../src/helpers/SecureStorageData';
import Badge from '../../src/components/Badge';
import { getNotifications } from '../../src/api/notifications';
import Text from '../../src/components/Text';

export default function Home() {
	const context = useContext(AuthContext);

	const [chats, setChats] = useState();
	const [users, setUsers] = useState();
	const [openCreateChat, setOpenCreateChat] = useState(false);
	const [loadingAddChat, setLoadingAddChat] = useState(false);
	const [errorCreateChat, setErrorCreateChat] = useState(null);
	const [notifications, setNotifications] = useState([]);

	const {
		userData,
	} = context;

	async function getAllChats() {
		try {
			const res = await getChats();

			if (res?.chats) {
				setChats(res.chats);
			}

			if (res?.users) {
				console.info('users ', res.users);
				setUsers(res.users);
			}
			return null;
		} catch (err) {
			return console.info('Err getAllChats ', err, ' in home.jsx');
		}
	}

	async function getAllNotifications() {
		try {
			const res = await getNotifications();
			console.info('res?.notifications ', res?.notifications);
			if (res?.notifications) {
				setNotifications(res?.notifications);
			}
			return null;
		} catch (err) {
			return console.info('Err getAllNotifications ', err, ' in home.jsx');
		}
	}

	function navigateToChat(chat) {
		const { chatId, participants } = chat;

		const participant = participants.find((p) => p.id !== userData?._id);

		router.navigate({
			pathname: 'chat',
			params: {
				chatId,
				chatTitle: `${users[participant.id].firstName || 'John'} ${users[participant.id].lastName || 'Doe'}`,
				participants: JSON.stringify(participants),
			},
		});
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

	useFocusEffect(
		useCallback(() => {
			getAllChats();
			getAllNotifications();
		}, []),
	);

	return (
		<Screen safe={false} style={styles.screen}>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>
			<View style={styles.header} />
			<View style={styles.userSection}>
				<Badge
					style={styles.badgeStyle}
					icon="user"
					color="#848484"
					onPress={() => router.navigate({ pathname: 'profile' })}
				/>
				<Badge
					style={styles.badgeStyle}
					icon="envelope"
					color="#848484"
					value={notifications.filter((notif) => notif.status === 'pending').length}
					onPress={() => router.navigate({ pathname: 'notifications', params: { notifications: JSON.stringify(notifications) } })}
				/>
			</View>
			{(chats && chats.length > 0 && users) ? (
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
			{chats && chats.length === 0 ? (
				<Text
					size="regular-18"
					center
				>
					There are not chats to show
				</Text>
			) : null}
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
