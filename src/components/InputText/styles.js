import {
	Platform,
	StyleSheet,
} from 'react-native';

import Colors from '../../themes/colors';

const style = ({
	error,
	highlite,
}) => StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: highlite ? Colors.primary.blue10 : 'transparent',
		marginHorizontal: Platform.OS === 'web' ? 20 : 0,
	},
	maxContainer: {
		marginRight: 10,
	},
	text: {
		width: '90%',
		fontSize: 20,
		fontWeight: '400',
		paddingVertical: 10,
		paddingHorizontal: 10,
		color: error ? Colors.primary.error : Colors.primary.gray90,
	},
	line: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary.gray40,
		width: '100%',
		position: 'absolute',
		paddingTop: Platform.OS === 'web' ? 0 : 40,
		marginTop: Platform.OS === 'web' ? 40 : 0,
	},
	errorMessageContainer: {
		marginTop: 5,
	},
});

export default style;
