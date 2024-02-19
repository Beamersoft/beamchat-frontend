import { StyleSheet } from 'react-native';

import Colors from '../../../helpers/colors';

const styles = (disabled) => StyleSheet.create({
	container: {
		width: 40,
		height: 40,
		zIndex: 999,
	},
	container_buttoncircle: {
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: disabled ? Colors('gray10') : Colors('white10'),
		borderRadius: 100,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		zIndex: 999,
	},
	container_item_text: {
		fontSize: 10,
		textAlign: 'center',
		marginTop: 4,
		fontWeight: '600',
		color: disabled ? Colors('gray70') : Colors('blue30'),
	},
});

export default styles;
