import {
	Stack,
} from 'expo-router';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../src/providers/AuthContext';
import Screen from '../../src/components/Screen';
import Text from '../../src/components/Text';
import Button from '../../src/components/Button';

export default function Home() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const { logout } = context;

	useEffect(() => {
		console.info('CONTEXT HOME ====> ', context);
	}, []);

	return (
		<Screen>
			<Stack.Screen
				options={{
					title: 'Home',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					headerTitle: 'Home',
				}}
			/>
			<Text>Home page</Text>
			<Button
				label={`${t('LOGOUT')}`}
				color="white10"
				onPress={() => logout()}
			/>
		</Screen>
	);
}
