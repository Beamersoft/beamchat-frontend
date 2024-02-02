import {
	ActivityIndicator,
	View,
	Modal,
} from 'react-native';

function LoadingModalSpinner({ visible }) {
	if (!visible) {
		return null;
	}

	return (
		<Modal
			statusBarTranslucent
			animationType="none"
			transparent
			visible={visible}
		>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'rgba(0,0,0,0.5)',
				}}
			>
				<ActivityIndicator animating color="#511ED2" size="large" />
			</View>
		</Modal>
	);
}

export default LoadingModalSpinner;
