import api from '.';

export async function getMessages(chatId = 'none', limit = 20, page = 0) {
	try {
		console.info('======> getMessages ', chatId, limit, page);
		const response = await api({
			host: 'http://10.0.2.2:3500',
			microservice: 'services',
			module: 'messages',
			method: 'POST',
			data: {
				chatId,
				limit,
				skip: (Number(limit) * Number(page)).toString(),
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
