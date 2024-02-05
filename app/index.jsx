import {
	Link,
} from 'expo-router';
import { useContext, useEffect } from 'react';
import {
	Text,
	View,
} from 'react-native';
import AuthContext from '../src/providers/AuthContext';
import Screen from '../src/components/Screen';

export default function Login() {
	const context = useContext(AuthContext);

	const { deviceId } = context;

	useEffect(() => {
		console.info('Context ', context);
	}, [deviceId]);

	return (
		<Screen>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Login Screen</Text>
				<Link href={{ pathname: 'details', params: { name: 'Bacon' } }}>Go to Details</Link>
			</View>
		</Screen>
	);
}
