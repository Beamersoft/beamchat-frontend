import React from 'react';
import { Stack } from 'expo-router';
import Colors from '../../src/themes/colors';

function PublicLayout() {
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
				name="login"
				options={{
					headerTitle: 'Fill your auth to get started!',
				}}
			/>
			<Stack.Screen
				name="register"
				options={{
					headerTitle: 'Create Account',
				}}
			/>
		</Stack>
	);
}

export default PublicLayout;
