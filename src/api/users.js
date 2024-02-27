import api from '.';

export async function login(email = 'none@mail.com', password = 'password') {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3500', // beamer123$oft
			microservice: 'services',
			module: 'users/login',
			method: 'POST',
			data: {
				email,
				password,
			},
		});

		if (response.data) return response.data;
		throw new Error('Lib login no data');
	} catch (err) {
		console.info('login error: ', err.status, err.message);
		throw err;
	}
}

export default '1.0';
