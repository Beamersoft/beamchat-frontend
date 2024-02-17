import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

import {
	useLocalSearchParams,
} from 'expo-router';

import {
	View,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { FlashList } from '@shopify/flash-list';

import crypto from 'react-native-quick-crypto';

import socket from '../../src/api/socket';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Button from '../../src/components/Button';
import Text from '../../src/components/Text';
import InputText from '../../src/components/InputText';
import { getMessages } from '../../src/api/messages';
import styles from './chat.styles';
import { decrypt, encrypt } from '../../src/helpers/crypto';

async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
	const result = await SecureStore.getItemAsync(key);
	if (result) {
		return result;
	}
	return undefined;
}

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

	async function generateKey() {
		console.info('====================================> START of End-to-End logic');

		// First stage

		const curveName = 'prime192v1';
		const ecdh = crypto.createECDH(curveName); // perhaps this should be saved in secure store.
		ecdh.generateKeys();

		const privateKey = ecdh.getPrivateKey().toString('base64');
		const publicKey = ecdh.getPublicKey().toString('base64');

		console.info('Step 1 -> user 1 creates its private key and public key.');
		console.info('Private key ', privateKey);
		console.info('Public key ', publicKey);

		console.info('Step 2 -> user 2 generates its keys, receives the user 1 public key and generates shared secret');

		const ecdh2 = crypto.createECDH(curveName); // perhaps this should be saved in secure store.
		ecdh2.generateKeys();

		const privateKey2 = ecdh2.getPrivateKey().toString('base64');
		const publicKey2 = ecdh2.getPublicKey().toString('base64');

		console.info('Private 2 key ', privateKey2);
		console.info('Public 2 key ', publicKey2);

		const receivedPublicKey = Buffer.from(publicKey, 'base64');
		const secretKey2 = ecdh2.computeSecret(receivedPublicKey); // -> will be used to encrypt messages

		const receivedPublicKey2 = Buffer.from(publicKey2, 'base64');
		const secretKey = ecdh.computeSecret(receivedPublicKey2); // -> will be used to encrypt messages

		console.info('shared secretKey for 2 ', secretKey2.toString('base64'));

		console.info('shared secretKey for 1 ', secretKey.toString('base64'));

		const encryptedData = await encrypt('HOLA', secretKey.toString('base64'));
		console.info('Encrypt message "HOLA" :', encryptedData);

		console.info('Decrypt message "HOLA" :', await decrypt(encryptedData, secretKey.toString('base64')));

		// Second stage, take the private key and decrypt the message

		// Initialize ecdh with private key

		const ecdhFromPrivateKey = crypto.createECDH('prime192v1');
		const privateKeyToSave = ecdh.getPrivateKey().toString('base64');

		console.info('privateKeyToSave ', privateKeyToSave);

		await save('private_key', privateKeyToSave);

		const savedData = await getValueFor('private_key');

		console.info('savedData ', savedData);

		const privateKeyBuffer = Buffer.from(savedData, 'base64');
		ecdhFromPrivateKey.setPrivateKey(privateKeyBuffer);

		const finalSecretKey = ecdhFromPrivateKey.computeSecret(receivedPublicKey2).toString('base64');
		console.info('SECRET KEY OBTAINED FROM PRIVATE KEY: ', finalSecretKey);

		const finalEncryptedData = await encrypt('HOLA', finalSecretKey);
		console.info('encrypt message: ', finalEncryptedData);

		console.info('decrypted message: ', await decrypt(finalEncryptedData, finalSecretKey));

		console.info('====================================> END of End-to-End logic');
	}

	useEffect(() => {
		if (socketConnected) {
			socket.timeout(5000).emit('CHAT_JOIN', chatId);
		}
	}, [socketConnected]);

	useEffect(() => {
		generateKey();
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
