import React, {
	useContext,
} from 'react';

import {
	View,
} from 'react-native';

import styles from './styles';
import AuthContext from '../../providers/AuthContext';
import Text from '../Text';

function NotNetwork() {
	const context = useContext(AuthContext);
	const { connected } = context;

	if (connected) return null;
	return (
		<View style={styles.container}>
			<Text color="white10" center size="regular-14">Sin internet, por favor comprueba tu conexión</Text>
		</View>
	);
}

export default NotNetwork;
