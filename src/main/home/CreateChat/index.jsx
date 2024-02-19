import { useState } from 'react';

import { View } from 'react-native';

import { useTranslation } from 'react-i18next';

import ModalComponent from '../../../components/Modal';
import Text from '../../../components/Text';
import InputText from '../../../components/InputText';
import styles from './styles';

function CreateChat({
	visible,
	onPress,
	onRequestClose,
	loading,
	errorMessage,
}) {
	const [email, setEmail] = useState('');

	const { t } = useTranslation();

	return (
		<ModalComponent
			visible={visible}
			btnCancel={`${t('CANCEL')}`}
			btnContent={`${t('CONTINUE')}`}
			onPress={() => onPress(email)}
			onRequestClose={onRequestClose}
			isLoadingBtnContent={loading}
		>
			<View
				style={styles.container}
			>
				{errorMessage ? (
					<Text
						style={styles.errorText}
						center
					>
						{`ERROR: ${errorMessage}`}
					</Text>
				) : null}
				<Text>{`${t('HOME_CREATE_CHAT_TITLE')}`}</Text>
				<InputText
					placeholder={`${t('EMAIL')}`}
					onChangeText={(txt) => setEmail(txt)}
				/>
			</View>
		</ModalComponent>
	);
}

export default CreateChat;
