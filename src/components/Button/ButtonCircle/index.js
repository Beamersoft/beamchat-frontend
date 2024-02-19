import React from 'react';

import {
	TouchableOpacity,
	View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Text from '../../Text';

import styles from './styles';

function ButtonCircle({
	onPress = () => {},
	disabled,
	label,
	style,
	icon = 'plus',
	iconSize = 30,
}) {
	const localStyles = styles(disabled);

	const getIcon = () => <Icon name={icon} size={iconSize} />;

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
