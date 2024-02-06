import {
	Link, Stack,
} from 'expo-router';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import InputText from '../../src/components/InputText';
import ButtonComponent from '../../src/components/Button';

export default function Register() {
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
					title: 'Register',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					headerTitle: 'Register',
				}}
			/>
			<InputText
				placeholder={`${t('EMAIL')}`}
			/>
			<InputText
				placeholder={`${t('USERNAME')}`}
			/>
			<InputText
				placeholder={`${t('FIRSTNAME')}`}
			/>
			<InputText
				placeholder={`${t('LASTNAME')}`}
			/>
			<InputText
				password
				placeholder={`${t('PASSWORD')}`}
			/>
			<InputText
				password
				placeholder={`${t('REPEAT_PASSWORD')}`}
			/>
			<ButtonComponent
				label={`${t('CONTINUE')}`}
			/>
		</Screen>
	);
}
