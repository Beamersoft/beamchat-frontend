import { StyleSheet } from 'react-native';

import Colors from '../../../helpers/colors';

const styles = (active, icon) => StyleSheet.create({
	buttonrowContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 58,
		backgroundColor: active && '#6528FF1A',
		marginHorizontal: 0,
		paddingHorizontal: active ? 16 : 0,
		borderRadius: 8,
	},
	buttonrowItemText: {
		color: active ? Colors('blue30') : Colors('gray90'),
	},
	buttonrowItemChildren: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: icon.length > 0 ? -12 : 0,
		flex: 1,
	},
});

export default styles;
