import {
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	Link,
	Stack,
} from 'expo-router';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import InputText from '../../src/components/InputText';
import { login } from '../../src/api/users';
import { storeData } from '../../src/helpers/StorageData';
import Button from '../../src/components/Button';
import Text from '../../src/components/Text';
import styles from './login.styles';

export default function Login() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const {
		userData,
		setToken,
		setUserData,
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

				if (res) {
					await setToken(res.jwt);
					delete res.jwt;
					setUserData(res);
					await storeData(res, 'userData');
				}
			}
		} catch (err) {
			console.info('Err loginUser ', err, ' in login.jsx');
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
				style={styles.input}
				withLine={false}
			/>
			<InputText
				password
				placeholder={`${t('PASSWORD')}`}
				onChangeText={(txt) => setPassword(txt)}
				withLine={false}
				style={styles.input}
			/>
			<Link href={{ pathname: 'register' }} style={styles.link}>
				<Text style={styles.linkText}>{`${t('REGISTER_HINT')}`}</Text>
			</Link>
			<Button
				label={`${t('CONTINUE')}`}
				color="white10"
				onPress={() => loginUser()}
				visibleSpinner={loading}
			/>
		</Screen>
	);
}
