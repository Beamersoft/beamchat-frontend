import {
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	Stack,
	useLocalSearchParams,
} from 'expo-router';
import { useTranslation } from 'react-i18next';

import socket from '../../src/api/socket';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Button from '../../src/components/Button';
import Text from '../../src/components/Text';
import InputText from '../../src/components/InputText';
import { getMessages } from '../../src/api/messages';

export default function Chat() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');

	const { userData, socketConnected } = context;

	const { chatId, participantsId } = useLocalSearchParams();

	async function getChatMessages() {
		try {
			console.info('getChatMessages called');
			const response = await getMessages(userData?._id, chatId);
			if (response && Array.isArray(response) && response.length > 0) {
				setMessages(response);
			}
		} catch (err) {
			console.info('Err getChatMessages ', err, ' in chat.jsx');
		}
	}

	function emitMessage() {
		setMessage('');
		const messageData = {
			chatId,
			message,
			userId: userData?._id,
		};
		socket.timeout(5000).emit('chat message', messageData);
	}

	function pushChat(msg) {
		if (chatId === msg.chatId) {
			setMessages((prev) => [...prev, { _id: Math.random(), text: msg.message }]);
		}
	}

	useEffect(() => {
		if (socketConnected) {
			socket.timeout(5000).emit('join chat', chatId);
		}
	}, [socketConnected]);

	useEffect(() => {
		socket.connect();
		socket.on('chat message', pushChat);

		getChatMessages();

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<Screen>
			<Stack.Screen
				options={{
					title: `Chat ${chatId || ''}`,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					headerTitle: `Chat ${chatId || ''}`,
				}}
			/>
			{messages ? messages.map((msg) => (
				<Text key={msg._id}>{msg.text}</Text>
			)) : null}
			<InputText
				value={message}
				onChangeText={(txt) => setMessage(txt)}
			/>
			<Button
				label={`${t('SEND')}`}
				color="white10"
				onPress={() => emitMessage()}
			/>
		</Screen>
	);
}
