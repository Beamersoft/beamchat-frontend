import React from 'react';
import { View } from 'react-native';

import Icons from '../../Icons';

import styles from './styles';

function ButtonSquareRegular({
	transparent,
	size = 22,
	url,
	color = '#202020',
}) {
	const localStyles = styles(transparent);

	return (
		<View style={localStyles.buttonsquareregular_container}>
			{Icons(url, color, size)}
		</View>
	);
}
export default ButtonSquareRegular;
