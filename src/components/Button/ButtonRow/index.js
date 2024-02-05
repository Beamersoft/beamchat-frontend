import React from 'react';

import {
	TouchableOpacity,
	View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Colors from '../../../helpers/colors';

import ButtonSquareRegular from '../ButtonSquareRegular';
import Text from '../../Text';

import styles from './styles';
import { track } from '../../../helpers/analytics';

function ButtonRow({
	label,
	onPress = () => {},
	active = false,
	icon = '',
	style,
	color,
	titleStyle,
	testID,
}) {
	const localStyles = styles(active, icon);
	const { t } = useTranslation();

	function handlePress() {
		track(undefined, {
			label,
			testID,
			name: 'buttonRow',
			action: 'click',
		}, 'analytics');
		if (onPress) onPress();
	}

	return (
		<TouchableOpacity
			testID={testID}
			onPress={() => handlePress()}
			style={[localStyles.buttonrowContainer, style]}
		>
			<View style={localStyles.buttonrowItemChildren}>
				{icon.length > 0 && (
					<ButtonSquareRegular color={Colors(color)} url={icon} size={18} />
				)}
				<Text
					size="semibold-16"
					color="gray90"
					style={[localStyles.buttonrowItemText, titleStyle]}
				>
					{`${t(label)}`}
				</Text>
			</View>
			<ButtonSquareRegular color={Colors('blue30')} url="CaretRight" />
		</TouchableOpacity>
	);
}
export default ButtonRow;
