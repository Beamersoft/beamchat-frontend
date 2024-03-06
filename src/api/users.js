import api from '.';

export async function login(email = 'none@mail.com', password = 'password') {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3500',
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

export async function register(
	email = 'none@mail.com',
	firstName = 'John',
	lastName = 'Doe',
	password = 'password',
) {
	try {
		const response = await api({
			host: 'http://10.0.2.2:3500',
			microservice: 'services',
			module: 'users',
			method: 'PUT',
			data: {
				email,
				firstName,
				lastName,
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
