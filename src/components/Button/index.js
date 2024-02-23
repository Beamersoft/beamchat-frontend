import React from 'react';
import {
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';

import Colors from '../../helpers/colors';
import Text from '../Text';

import styles from './styles';

function Button({
	testID,
	label,
	background = 'blue30',
	color = '#000',
	onPress = () => {},
	name = '',
	underline,
	style,
	disabled = false,
	small,
	widetiny,
	inv = false,
	fontWeight = 'bold',
	fullWidth = false,
	underlineColor,
	widthContent = '100%',
	visibleSpinner = false,
}) {
	let heightButton = small ? 32 : 52;
	if (widetiny) heightButton = 24;

	let backgroundColor = Colors(background);
	if (disabled) backgroundColor = Colors('gray20');
	if (underline && !underlineColor) backgroundColor = Colors('white');

	let width = widthContent;
	if (widetiny) width = 108;
	if (small && !inv) width = 124;
	if (small && inv) width = 282;
	if (fullWidth) width = '100%';

	let colorButton = color;
	if (disabled) colorButton = 'gray60';
	if (underline) colorButton = 'blue30';

	let fontSize = 16;
	if (widetiny) fontSize = 8;
	if (small) fontSize = 12;

	// let sizeIcon = 30;

	// if (widetiny) sizeIcon = 10;
	// if (small) sizeIcon = 24;

	const localStyles = styles(
		heightButton,
		backgroundColor,
		underline,
		background,
		width,
		colorButton,
		fontSize,
		fontWeight,
		underlineColor,
	);

	function onPressHandle() {
		if (onPress) onPress();
	}

	return (
		<TouchableOpacity
			style={[localStyles.button_component, style, { width }]}
			onPress={() => onPressHandle()}
			disabled={disabled}
			testID={testID}
		>
			{/* {iconLeft ? (
				<View style={{ marginRight: 8 }}>
					{Icons(name, colorIcon, sizeIcon)}
				</View>
			) : null } */}
			{visibleSpinner ? (
				<ActivityIndicator />
			) : (
				<Text size={`${fontWeight}-${fontSize}`} color={colorButton}>
					{`${label}`}
				</Text>
			)}
		</TouchableOpacity>
	);
}
export default Button;
