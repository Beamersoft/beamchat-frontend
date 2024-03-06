import {
	useContext,
	useState,
} from 'react';
import {
	Stack,
} from 'expo-router';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import InputText from '../../src/components/InputText';
import Button from '../../src/components/Button';
import Text from '../../src/components/Text';
import styles from './register.styles';
import { login, register } from '../../src/api/users';
import { storeData } from '../../src/helpers/StorageData';

export default function Register() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const [email, setEmail] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [password, setPassword] = useState();
	const [repeatPassword, setRepeatPassword] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const {
		setToken,
		setUserData,
	} = context;

	const fieldsValid = email && firstName && lastName && password && repeatPassword;

	async function registerUser() {
		try {
			setError();
			setLoading(true);
			// TODO: Add fields validation

			if (password === repeatPassword) {
				const registerResponse = await register(email, firstName, lastName, password);

				if (registerResponse?.active) {
					const loginResponse = await login(email, password);

					if (loginResponse) {
						await setToken(loginResponse.jwt);
						delete loginResponse.jwt;
						setUserData(loginResponse);
						await storeData(loginResponse, 'userData');
					}
				}
			} else {
				setError('Passwords must match');
			}
		} catch (err) {
			console.info('Err loginUser ', err, ' in login.jsx');
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Screen>
			<Stack.Screen
				options={{
					title: 'Register',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					headerTitle: 'Register',
				}}
			/>
			<InputText
				placeholder={`${t('EMAIL')}`}
				onChangeText={(txt) => setEmail(txt)}
				style={styles.input}
				withLine={false}
			/>
			<InputText
				placeholder={`${t('FIRSTNAME')}`}
				onChangeText={(txt) => setFirstName(txt)}
				style={styles.input}
				withLine={false}
			/>
			<InputText
				placeholder={`${t('LASTNAME')}`}
				onChangeText={(txt) => setLastName(txt)}
				style={styles.input}
				withLine={false}
			/>
			<InputText
				password
				placeholder={`${t('PASSWORD')}`}
				onChangeText={(txt) => setPassword(txt)}
				style={styles.input}
				withLine={false}
			/>
			<InputText
				password
				placeholder={`${t('REPEAT_PASSWORD')}`}
				onChangeText={(txt) => setRepeatPassword(txt)}
				style={styles.input}
				withLine={false}
			/>
			{error ? (
				<Text
					center
					color="error"
					style={styles.error}
				>
					{error}
				</Text>
			) : null}
			<Button
				label={`${t('CONTINUE')}`}
				color="white10"
				onPress={() => registerUser()}
				visibleSpinner={loading}
				disabled={!fieldsValid}
			/>
		</Screen>
	);
}
