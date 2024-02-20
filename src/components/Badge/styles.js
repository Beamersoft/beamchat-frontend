import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
	},
	badge: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: -5, // Adjust these values as needed
		right: -5, // Adjust these values as needed
	},
	badgeText: {
		color: 'white',
		textAlign: 'center',
	},
});

export default styles;
