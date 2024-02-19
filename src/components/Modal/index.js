import React from 'react';

import {
	Modal,
	View,
	ScrollView,
	Image,
} from 'react-native';

import Button from '../Button';
import Text from '../Text';
import styles from './styles';

function ModalComponent({
	children,
	onRequestClose = () => {},
	onPress = () => {},
	testID,
	visible = true,
	icon,
	title,
	btnContent,
	btnCancel,
	style,
	backgroundColor = 'white10',
	backgroundMainButton = 'blue30',
	backgroundClose = 'white',
	colorClose = 'blue30',
	source,
	backgroundImage,
	titleSizeBig = false,
	heightImage = 182,
	iconSize = 40,
	isLoadingBtnContent = false,
	isLoadingBtnCancel = false,
}) {
	const localStyles = styles(backgroundColor, backgroundImage, heightImage, iconSize);

	async function handleClose() {
		onRequestClose();
	}

	async function handleConfirm() {
		onPress();
	}

	return (
		<Modal
			statusBarTranslucent
			transparent
			animationType="fade"
			visible={visible}
			onRequestClose={() => handleClose()}
		>
			<View style={localStyles.component_modal}>
				<View style={[localStyles.component_item_modal, style]}>
					{backgroundImage ? (
						<View style={localStyles.containerBackgroundImage}>
							<Image
								source={backgroundImage}
								style={localStyles.backgroundImage}
							/>
						</View>
					) : (icon || source) && (
						<Image
							style={localStyles.item_image_modal}
							source={source ? { uri: source } : icon}
						/>
					)}
					<ScrollView style={localStyles.item_children_modal}>
						{title && (
							<Text
								style={localStyles.itemTitleModal}
								center
								size={icon || titleSizeBig ? 'bold-22' : 'bold-18'}
							>
								{`${title}`}
							</Text>
						)}
						{children}
					</ScrollView>
					{btnContent && btnContent.length > 0 && (
						<Button
							label={btnContent}
							background={backgroundMainButton}
							testID={testID}
							color="white"
							onPress={() => handleConfirm()}
							widthContent={backgroundImage ? '90%' : '100%'}
							visibleSpinner={isLoadingBtnContent}
							disabled={isLoadingBtnContent}
						/>
					)}
					{btnCancel && btnCancel.length > 0 && (
						<Button
							label={btnCancel}
							style={{
								marginTop: 8,
								backgroundColor: backgroundClose,
							}}
							color={colorClose}
							onPress={() => handleClose()}
							widthContent={backgroundImage ? '90%' : '100%'}
							disabled={isLoadingBtnCancel}
						/>
					)}
				</View>
			</View>
		</Modal>
	);
}
export default ModalComponent;
