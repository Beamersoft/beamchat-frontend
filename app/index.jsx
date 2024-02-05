import {
	Link, Stack,
} from 'expo-router';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AuthContext from '../src/providers/AuthContext';
import Screen from '../src/components/Screen';
import InputText from '../src/components/InputText';
import ButtonComponent from '../src/components/Button';

export default function Login() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const { deviceId } = context;

	useEffect(() => {
		console.info('Context ', context);
	}, [deviceId]);

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
			/>
			<InputText
				password
				placeholder={`${t('PASSWORD')}`}
			/>
			<ButtonComponent
				label={`${t('CONTINUE')}`}
			/>
		</Screen>
	);
}
