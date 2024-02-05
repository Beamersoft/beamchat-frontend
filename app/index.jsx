import {
	Link,
} from 'expo-router';
import { useContext, useEffect } from 'react';
import {
	Text,
	TextInput,
	View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import AuthContext from '../src/providers/AuthContext';
import Screen from '../src/components/Screen';
import InputText from '../src/components/InputText';

export default function Login() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const { deviceId } = context;

	useEffect(() => {
		console.info('Context ', context);
	}, [deviceId]);

	return (
		<Screen>
			<View style={{
				alignItems: 'center',
				justifyContent: 'center',
				alignContent: 'center',
			}}
			>
				{/* <Text>Login Screen</Text>
				<Link href={{ pathname: 'details', params: { name: 'Bacon' } }}>Go to Details</Link> */}
				<InputText
					placeholder={`${t('EMAIL')}`}
				/>
				<InputText
					password
					placeholder={`${t('PASSWORD')}`}
				/>
			</View>
		</Screen>
	);
}
