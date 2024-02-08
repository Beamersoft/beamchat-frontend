import api from '.';

export async function getChats() {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3501',
			module: 'chats',
			method: 'GET',
		});

		if (response.data) return response.data;
		throw new Error('Lib getChats no data');
	} catch (err) {
		console.info('getChats error: ', err.status, err.message);
		throw err;
	}
}

export default '1.0';
