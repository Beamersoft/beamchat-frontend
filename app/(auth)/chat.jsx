import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

import {
	View,
} from 'react-native';

import {
	useLocalSearchParams,
} from 'expo-router';

import { FlashList } from '@shopify/flash-list';

import crypto from 'react-native-quick-crypto';

import socket from '../../src/api/socket';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Button from '../../src/components/Button';
import Text from '../../src/components/Text';
import InputText from '../../src/components/InputText';
import { getMessages } from '../../src/api/messages';
import {
	CRYPTO_CURVE_NAME,
	decrypt,
	encrypt,
} from '../../src/helpers/crypto';
import styles from './chat.styles';
import { secureGetData } from '../../src/helpers/SecureStorageData';

export default function Chat() {
	const context = useContext(AuthContext);

	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [page, setPage] = useState(0);
	const [secretKey, setSecretKey] = useState();
	const [chatAvailable, setChatAvailable] = useState(false);

	const {
		userData,
		socketConnected,
	} = context;

	const {
		chatId,
		participants,
	} = useLocalSearchParams();

	const keyExtractor = useCallback((item, i) => `${i}-${item._id}`, []);

	async function getChatMessages(secretk, pag = 0) {
		try {
			const response = await getMessages(userData?._id, chatId, 20, pag);
			if (response && Array.isArray(response) && response.length > 0) {
				const promisesToDecrypt = response.map(async (msg) => {
					const decryptedText = await decrypt({
						iv: msg.iv,
						content: msg.text,
					}, secretk);

					return {
						...msg,
						text: decryptedText,
					};
				});
				const decryptedMessages = await Promise.all(promisesToDecrypt);

				setMessages((prev) => [...prev, ...decryptedMessages]);
			}
		} catch (err) {
			console.info('Error getChatMessages ', err, ' in chat.jsx');
		}
	}

	async function onEndReached() {
		secretKey && getChatMessages(secretKey, page + 1);
		setPage((prev) => prev + 1);
	}

	async function emitMessage() {
		setMessage('');
		// encrypt
		const encryptedData = await encrypt(message, secretKey);

		const messageData = {
			chatId,
			iv: encryptedData.iv,
			message: encryptedData.content,
			userId: userData?._id,
		};
		socket.timeout(5000).emit('CHAT_MESSAGE', messageData);
	}

	async function pushChat(msg) {
		if (chatId === msg.chatId) {
			// decrypt
			const decryptedMessage = await decrypt({
				iv: msg.iv,
				content: msg.message,
			}, secretKey);

			setMessages((prev) => [{ _id: Math.random(), text: decryptedMessage }, ...prev]);
		}
	}

	async function initializeChat() {
		let priKey;
		let secretKeyGenerated;
		try {
			priKey = await secureGetData(`prik-${chatId}`);

			if (!priKey) {
				return;
			}

			// El chat contiene otro participante y tiene una clave pública entonces se puede iniciar el chat.
			const participantsOnChat = JSON.parse(participants);
			const otherPartyIdx = participantsOnChat.findIndex((p) => p.id !== userData?._id);
			const otherPartyPublicKey = participantsOnChat[otherPartyIdx]?.pubKey;

			if (otherPartyIdx === -1 || !otherPartyPublicKey) {
				return;
			}

			setChatAvailable(true);

			const privateKeyBuffer = Buffer.from(priKey, 'base64');
			const otherPartyPublicKeyBuffer = Buffer.from(otherPartyPublicKey, 'base64');

			const ecdhFromPrivateKey = crypto.createECDH(CRYPTO_CURVE_NAME);
			ecdhFromPrivateKey.setPrivateKey(privateKeyBuffer);

			secretKeyGenerated = ecdhFromPrivateKey.computeSecret(otherPartyPublicKeyBuffer).toString('base64');

			setSecretKey(secretKeyGenerated);
		} catch (err) {
			console.info('Error checkKeys ', err, ' in Chat.jsx');
		} finally {
			priKey = null;
			await getChatMessages(secretKeyGenerated);
		}
	}

	useEffect(() => {
		if (secretKey) {
			socket.on('CHAT_MESSAGE', pushChat);
		}
	}, [secretKey]);

	useEffect(() => {
		if (socketConnected) {
			socket.timeout(5000).emit('CHAT_JOIN', chatId);
		}
	}, [socketConnected]);

	useEffect(() => {
		socket.connect();

		initializeChat();

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
