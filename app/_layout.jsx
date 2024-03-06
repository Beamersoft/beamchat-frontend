import {
	useContext,
	useEffect,
} from 'react';
import 'react-native-get-random-values';
import 'core-js/stable/atob';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { I18nextProvider } from 'react-i18next';
import {
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {
	Slot,
	useRouter,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import i18n from '../src/i18n';

import AuthProviderContext from '../src/providers/AuthProvider';
import AuthContext from '../src/providers/AuthContext';

export {
	ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function InitialLayout() {
	const context = useContext(AuthContext);

	const {
		logged,
		loading,
	} = context;
	const router = useRouter();

	useEffect(() => {
		if (loading) return;

		if (logged) {
			router.replace('(auth)/home');
		} else if (!logged) {
			router.replace('(public)/login');
		}
	}, [logged]);

	return <Slot />;
}

function RootLayoutNav() {
	return (
		<AuthProviderContext>
			<I18nextProvider>
				<ThemeProvider value={DefaultTheme}>
					<InitialLayout />
				</ThemeProvider>
			</I18nextProvider>
		</AuthProviderContext>
	);
}
