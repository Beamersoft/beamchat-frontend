import {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import {
	useLocalSearchParams,
} from 'expo-router';

import {
	View,
} from 'react-native';

import { FlashList } from '@shopify/flash-list';

import socket from '../../src/api/socket';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Button from '../../src/components/Button';
import Text from '../../src/components/Text';
import InputText from '../../src/components/InputText';
import { getMessages } from '../../src/api/messages';
import styles from './chat.styles';

export default function Chat() {
	const context = useContext(AuthContext);

	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [page, setPage] = useState(0);

	const {
		userData,
		socketConnected,
	} = context;

	const {
		chatId,
		participantsId,
	} = useLocalSearchParams();

	const keyExtractor = useCallback((item, i) => `${i}-${item._id}`, []);

	async function getChatMessages(pag = 0) {
		try {
			console.info('getChatMessages called');
			const response = await getMessages(userData?._id, chatId, 20, pag);
			if (response && Array.isArray(response) && response.length > 0) {
				setMessages((prev) => [...prev, ...response]);
			}
		} catch (err) {
			console.info('Err getChatMessages ', err, ' in chat.jsx');
		}
	}

	async function onEndReached() {
		getChatMessages(page + 1);
		setPage((prev) => prev + 1);
	}

	function emitMessage() {
		setMessage('');
		const messageData = {
			chatId,
			message,
			userId: userData?._id,
		};
		socket.timeout(5000).emit('CHAT_MESSAGE', messageData);
	}

	function pushChat(msg) {
		if (chatId === msg.chatId) {
			setMessages((prev) => [{ _id: Math.random(), text: msg.message }, ...prev]);
		}
	}

	useEffect(() => {
		if (socketConnected) {
			socket.timeout(5000).emit('CHAT_JOIN', chatId);
		}
	}, [socketConnected]);

	useEffect(() => {
		socket.connect();
		socket.on('CHAT_MESSAGE', pushChat);

		getChatMessages();

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<Screen safe={false} style={styles.screen}>
			<FlashList
				data={messages}
				keyExtractor={keyExtractor}
				renderItem={({ item }) => (
					<View style={[
						styles.messageBubble,
						item.userId === userData?._id ? styles.myMessage : styles.theirMessage,
					]}
					>
						<Text style={styles.messageText}>{item.text}</Text>
					</View>
				)}
				showsVerticalScrollIndicator={false}
				inverted
				estimatedItemSize={200}
				onEndReached={() => onEndReached()}
				onEndReachedThreshold={0.2}
			/>
			<View style={styles.inputContainer}>
				<InputText
					style={styles.input}
					value={message}
					onChangeText={setMessage}
					placeholder="Type a message..."
				/>
				<Button
					widthContent="15%"
					label="Send"
					onPress={() => emitMessage()}
					style={styles.sendButton}
				/>
			</View>
		</Screen>
	);
}
