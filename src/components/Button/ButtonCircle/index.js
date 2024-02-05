import React from 'react';

import {
	TouchableOpacity,
	View,
} from 'react-native';
import {
	Password,
	Lifebuoy,
} from 'phosphor-react-native';

import Colors from '../../../helpers/colors';

import Text from '../../Text';

import styles from './styles';

function ButtonCircle({
	onPress = () => {},
	// active,
	disabled,
	label,
	style,
	icon = 'password',
}) {
	const localStyles = styles(disabled);

	const getIcon = () => {
		switch (icon) {
		case 'password':
			return <Password color={disabled ? Colors('gray70') : Colors('blue30')} />;
		case 'lifebuoy':
			return <Lifebuoy color={disabled ? Colors('gray70') : Colors('blue30')} />;
		default:
			return null;
		}
	};

	return (
		<View style={[localStyles.container, style]}>
			<TouchableOpacity
				onPress={onPress}
				style={localStyles.container_buttoncircle}
			>
				{getIcon()}
			</TouchableOpacity>
			{label && <Text style={localStyles.container_item_text}>{label}</Text>}
		</View>
	);
}
export default ButtonCircle;
