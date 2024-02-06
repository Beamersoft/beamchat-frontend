import {
	Link,
	Stack,
} from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import InputText from '../../src/components/InputText';
import { login } from '../../src/api/users';
import { storeData } from '../../src/helpers/StorageData';
import Button from '../../src/components/Button';

export default function Login() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const {
		userData,
		setToken,
	} = context;

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);

	async function loginUser() {
		try {
			setLoading(true);
			// TODO: Add email and password validation with errors
			if (email && password) {
				const res = await login(email, password);
				console.info('res ', res);

				if (res) {
					// Save in context and localstorage user token and make user logged.
					const data = { ...res };
					delete data.jwt;
					delete data.last_login;
					delete data.updated;
					delete data.success;
					delete data.added;
					delete data.active;
					delete data.criterial;
					delete data.logincount;

					await storeData(data, 'userData');
					await setToken(res.jwt);
					// Redirect to Home
				}
			}
		} catch (err) {
			console.info('Err loginUser ', err, ' in index.jsx');
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		console.info('Context ', context);
	}, [userData]);

	return (
		<Screen>
			<Stack.Screen
				options={{
					title: 'Login',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					headerTitle: 'Login',
				}}
			/>
			<InputText
				placeholder={`${t('EMAIL')}`}
				onChangeText={(txt) => setEmail(txt)}
			/>
			<InputText
				password
				placeholder={`${t('PASSWORD')}`}
				onChangeText={(txt) => setPassword(txt)}
			/>
			<Link href={{ pathname: 'register' }}>{`${t('REGISTER_HINT')}`}</Link>
			<Button
				label={`${t('CONTINUE')}`}
				color="white10"
				onPress={() => loginUser()}
				visibleSpinner={loading}
			/>
		</Screen>
	);
}
