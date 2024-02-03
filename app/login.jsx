import {
	Link,
	Stack,
} from 'expo-router';
import {
	Image,
	Text,
	View,
} from 'react-native';

function LogoTitle() {
	return (
		<Image
			style={{ width: 50, height: 50 }}
			source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
		/>
	);
}

export default function Login() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Stack.Screen
				options={{
					title: 'Login',
					headerStyle: { backgroundColor: '#f4511e' },
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					headerTitle: (props) => <LogoTitle {...props} />,
				}}
			/>
			<Text>Login Screen</Text>
			<Link href={{ pathname: 'details', params: { name: 'Bacon' } }}>Go to Details</Link>
		</View>
	);
}
