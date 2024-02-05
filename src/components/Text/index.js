import {
	Text,
} from 'react-native';

import Colors from '../../helpers/colors';
import Theme from '../../themes/default';

const theme = Theme();

function TextComponent({
	children,
	color = 'grey30',
	size = 'regular-16',
	center = false,
	style,
	testID,
	...rest
}) {
	const localStyle = {
		color: Colors(color),
		textAlign: center ? 'center' : 'left',
	};

	if (size) {
		const parts = size.split('-');
		if (parts.length === 2) {
			if (parts[0] in theme.sizes && parts[1] in theme.sizes) {
				localStyle.fontWeight = theme.sizes[parts[0]].weight;
				localStyle.fontSize = parseInt(theme.sizes[parts[1]], 10);
			}
		}
	}

	return (
		<Text style={[localStyle, style]} {...rest} allowFontScaling={false} testID={testID}>
			{children}
		</Text>
	);
}

export default TextComponent;
