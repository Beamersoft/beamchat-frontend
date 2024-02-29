import { useContext } from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../src/providers/AuthContext';
import Button from '../../src/components/Button';
import Screen from '../../src/components/Screen';
import Text from '../../src/components/Text';
import styles from './profile.styles';

function Profile() {
	const { t } = useTranslation();
	const context = useContext(AuthContext);

	const {
		logout,
		userData,
	} = context;

	return (
		<Screen>
			<Stack.Screen
				options={{
					title: 'Profile',
				}}
			/>
			<Text
				size="regular-18"
				style={styles.userName}
			>
				{`${userData?.firstName} ${userData?.lastName}`}
			</Text>
			<Button
				color="white"
				label={`${t('LOGOUT')}`}
				onPress={() => logout()}
				style={styles.logoutButton}
			/>
		</Screen>
	);
}

export default Profile;
