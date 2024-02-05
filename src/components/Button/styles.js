import { StyleSheet } from 'react-native';
import Colors from '../../helpers/colors';

const styles = (
	heightButton,
	backgroundColor,
	underline,
	background,
	width,
	colorButton,
	fontSize,
	fontWeight,
	underlineColor,
) => StyleSheet.create({
	button_component: {
		height: heightButton,
		backgroundColor,
		borderColor: underline && Colors(underlineColor || background),
		borderWidth: underline && 1,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		width,
	},
	button_component_text: {
		color: colorButton,
		fontSize,
		fontWeight,
	},
});
export default styles;
