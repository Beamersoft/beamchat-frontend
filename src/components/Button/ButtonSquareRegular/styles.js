import { StyleSheet } from 'react-native';
import Colors from '../../../helpers/colors';

const styles = (transparent) => StyleSheet.create({
	buttonsquareregular_container: {
		backgroundColor: transparent ? 'transparent' : Colors('white10'),
		width: 42,
		height: 42,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
});

export default styles;
