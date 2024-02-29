import api from '.';

export async function getNotifications() {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3500',
			microservice: 'services',
			module: 'notifications',
			method: 'POST',
		});

		if (response.data) return response.data;
		throw new Error('Lib getNotifications no data');
	} catch (err) {
		console.info('getNotifications error: ', err.status, err.message);
		throw err;
	}
}

export default '1.0';
