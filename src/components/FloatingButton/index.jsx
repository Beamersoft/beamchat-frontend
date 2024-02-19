import ButtonCircle from '../Button/ButtonCircle';

function FloatingButton({
	onPress,
}) {
	return (
		<ButtonCircle
			style={{
				position: 'absolute',
				bottom: 60,
				right: 40,
			}}
			iconSize={30}
			icon={'plus'}
			onPress={onPress}
		/>
	);
}

export default FloatingButton;
