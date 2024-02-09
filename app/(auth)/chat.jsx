import {
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import {
	useLocalSearchParams,
} from 'expo-router';
import { useTranslation } from 'react-i18next';

import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	View,
} from 'react-native';
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

	const {
		userData,
		socketConnected,
	} = context;

	const {
		chatId,
		participantsId,
	} = useLocalSearchParams();

	const flatListRef = useRef();

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
		<Screen safe={false} style={styles.screen}>
			<FlatList
				ref={flatListRef}
				data={messages}
				keyExtractor={(item, index) => item._id || index.toString()}
				renderItem={({ item }) => (
					<View style={[
						styles.messageBubble,
						item.userId === userData?._id ? styles.myMessage : styles.theirMessage,
					]}
					>
						<Text style={styles.messageText}>{item.text}</Text>
					</View>
				)}
				onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
				onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
			/>
			<View style={styles.inputContainer}>
				<InputText
					style={styles.input}
					value={message}
					onChangeText={setMessage}
					placeholder="Type a message..."
				/>
				<Button
					label="Send"
					onPress={() => emitMessage()}
					style={styles.sendButton}
				/>
			</View>
		</Screen>
	);
}
