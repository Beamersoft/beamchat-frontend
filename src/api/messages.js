import api from '.';

export async function getMessages(userId = 'none', chatId = 'none', limit = 20, skip = 0) {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3501',
			module: 'messages',
			method: 'GET',
			query: {
				userId,
				chatId,
				limit,
				skip,
			},
		});

		if (response.data?.messages) return response.data.messages;
		throw new Error('Lib getMessages no data');
	} catch (err) {
		console.info('getMessages error: ', err.status, err.message);
		throw err;
	}
}

export default '1.0';
