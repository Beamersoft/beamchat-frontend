import api from '.';

export async function getChats() {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3500',
			microservice: 'services',
			module: 'chats/all',
			method: 'POST',
		});

		if (response.data) return response.data;
		throw new Error('Lib getChats no data');
	} catch (err) {
		console.info('getChats error: ', err.status, err.message);
		throw err;
	}
}

export async function createChat(invitedEmail, pubKey, isPrivate = true) {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3500',
			microservice: 'services',
			module: 'chats/create',
			method: 'POST',
			data: {
				isPrivate,
				invitedEmail,
				pubKey,
			},
		});

		if (response.data) return response.data;
		throw new Error('Lib getChats no data');
	} catch (err) {
		console.info('getChats error: ', err.status, err.message);
		throw err;
	}
}

export async function acceptChatInvite(chatId, pubKey) {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3500',
			microservice: 'services',
			module: 'chats/accept',
			method: 'POST',
			data: {
				chatId,
				pubKey,
			},
		});

		if (response.data) return response.data;
		throw new Error('Lib getChats no data');
	} catch (err) {
		console.info('getChats error: ', err.status, err.message);
		throw err;
	}
}

export default '1.0';
