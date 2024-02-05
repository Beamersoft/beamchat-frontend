import React, {
	useState,
	useEffect,
} from 'react';

import {
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../Text';

import styles from './styles';
import Colors from '../../themes/colors';

function InputText({
	testID,
	onChangeText,
	value,
	placeholder,
	placeholderTextColor,
	onMaxPress,
	errorMessage,
	error = false,
	password = false,
	highlite = false,
	withLine = true,
	inputMode = null,
	keyboardType = 'default',
	LeftIcon = () => null,
	onPressLeftIcon = () => {},
	editable,
	multiline,
	style,
	maxLength,
	onSubmitEditing,
	useRef,
	onFocus,
	onBlur,
}) {
	const [visible, setVisible] = useState(true);
	const [lineColor, setLineColor] = useState(Colors.primary.gray40);
	const localStyles = styles({
		error,
		highlite,
		password,
		onMaxPress,
	});

	function onFocusInputText() {
		if (onFocus) onFocus();
		setLineColor(Colors.primary.blue30);
	}

	function onBlurInputText() {
		if (onBlur) onBlur();
		setLineColor(Colors.primary.gray70);
	}

	function handleChange(text) {
		if (onChangeText) onChangeText(text);
	}

	let borderBottomColor = lineColor;
	if (error) borderBottomColor = Colors.primary.error;

	useEffect(() => {
		setVisible(!password);
	}, [password]);

	return (
		<>
			<View style={[localStyles.container, style]}>
				{withLine && <View style={{ ...localStyles.line, borderBottomColor }} />}
				<TextInput
					testID={testID}
					style={localStyles.text}
					onChangeText={(t) => handleChange(t)}
					value={value}
					placeholder={placeholder}
					placeholderTextColor={placeholderTextColor || Colors.primary.gray60}
					secureTextEntry={!visible}
					onFocus={() => onFocusInputText()}
					onBlur={() => onBlurInputText()}
					allowFontScaling={false}
					inputMode={inputMode}
					keyboardType={keyboardType}
					editable={editable}
					multiline={multiline}
					maxLength={maxLength}
					onSubmitEditing={onSubmitEditing ? (e) => onSubmitEditing(e.nativeEvent.text) : undefined}
					ref={useRef}
				/>
				{password ? (
					<TouchableOpacity onPress={() => setVisible(!visible)}>
						{visible ? (
							<Icon name="eye" size={30} color={Colors.primary.blue30} />
						) : (
							<Icon name="eye-slash" size={30} color={Colors.primary.blue30} />
						)}
					</TouchableOpacity>
				) : null}
				{LeftIcon ? (
					<TouchableOpacity onPress={onPressLeftIcon}>
						<LeftIcon />
					</TouchableOpacity>
				) : null}
			</View>
			{error && errorMessage ? (
				<View style={localStyles.errorMessageContainer}>
					<Text color="error" size="regular-12">
						{errorMessage}
					</Text>
				</View>
			) : null}
		</>
	);
}

export default InputText;
