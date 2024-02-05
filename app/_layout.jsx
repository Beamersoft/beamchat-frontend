/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import 'react-native-get-random-values';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { I18nextProvider } from 'react-i18next';
import {
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import i18n from '../src/i18n';

import AuthProviderContext from '../src/providers/AuthProvider';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

function RootLayoutNav() {
	return (
		<I18nextProvider>
			<AuthProviderContext>
				<ThemeProvider value={DefaultTheme}>
					<Stack
						screenOptions={{
							headerTitleStyle: {
								fontWeight: 'bold',
							},
						}}
					/>
				</ThemeProvider>
			</AuthProviderContext>
		</I18nextProvider>
	);
}
