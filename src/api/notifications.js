import api from '.';

export async function getNotifications() {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3501',
			module: 'notifications',
			method: 'GET',
		});

		if (response.data) return response.data;
		throw new Error('Lib getNotifications no data');
	} catch (err) {
		console.info('getNotifications error: ', err.status, err.message);
		throw err;
	}
}

export default '1.0';
