import { StyleSheet } from 'react-native';
import Colors from '../../src/themes/colors';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	header: {
		padding: 20,
		backgroundColor: Colors.primary.blue30,
		color: '#FFFFFF',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	userSection: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		padding: 10,
	},
	userProfilePic: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	logoutButton: {
		backgroundColor: '#0078D4',
		color: '#FFFFFF',
		padding: 10,
		borderRadius: 5,
		marginRight: 10,
	},
	badgeStyle: {
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#0078D4',
	},
	content: {
		padding: 20,
	},
});

export default styles;
