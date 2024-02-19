import {
	StyleSheet,
} from 'react-native';

import Colors from '../../helpers/colors';

const styles = (backgroundColor, backgroundImage, heightImage, iconSize) => StyleSheet.create({
	component_modal: {
		width: '100%',
		alignItems: 'center',
		height: '100%',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	component_item_modal: {
		backgroundColor: Colors(backgroundColor),
		width: '90%',
		paddingVertical: !backgroundImage ? 24 : 20,
		paddingHorizontal: !backgroundImage ? 24 : 0,
		borderRadius: 24,
		alignItems: 'center',
		maxHeight: '80%',
		justifyContent: 'space-between',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	item_image_modal: {
		width: iconSize,
		height: iconSize,
		marginBottom: 10,
	},
	item_children_modal: {},
	itemTitleModal: {
		paddingBottom: 12,
		lineHeight: 26,
	},
	itemIcons: {
		paddingBottom: 16,
	},
	containerBackgroundImage: {
		width: '100%',
		height: heightImage,
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
		borderTopLeftRadius: 24,
		position: 'absolute',
		top: -20,
	},
});

export default styles;
