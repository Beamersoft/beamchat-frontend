import React from 'react';
import { Stack } from 'expo-router';

import Colors from '../../src/themes/colors';

function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.primary.blue30,
				},
				headerTintColor: '#fff',
				headerBackTitle: 'Back',
			}}
		>
			<Stack.Screen
				name="home"
			/>
		</Stack>
	);
}

export default AuthLayout;
