import {
	Stack, useGlobalSearchParams, useLocalSearchParams,
} from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import socket from '../../src/api/socket';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Button from '../../src/components/Button';
import { getChats } from '../../src/api/chats';
import Text from '../../src/components/Text';
import InputText from '../../src/components/InputText';

export default function Chat() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');

	const { userData } = context;

	const { chatId, participantsId } = useLocalSearchParams();

	async function getChatMessages() {
		try {
			// TODO: Implement get all past messages
		} catch (err) {
			return console.info('Err getChatMessages ', err, ' in chat.jsx');
		}
	}

	function emitMessage() {
		messages.push({ _id: Math.random(), text: message });
		setMessage('');
		const messageData = {
			chatId,
			message,
			userId: userData?._id,
		};
		console.info('messageData ', messageData);
		socket.timeout(5000).emit('chat message', messageData);
	}

	useEffect(() => {
		console.info('CONTEXT HOME ====> ', context);
		socket.connect();
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
