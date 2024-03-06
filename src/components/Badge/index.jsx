import React from 'react';

import {
	View,
	Pressable,
	Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

function Badge({
	onPress,
	icon,
	size = 30,
	color = '#FFF',
	badgeColor = '#FF2D2D',
	value = 0,
}) {
	const badgeSize = value > 9 ? 20 : 16;
	const fontSize = value > 9 ? 12 : 10;

	return (
		<Pressable
			onPress={onPress}
		>
			<View style={styles.container}>
				<Icon name={icon} size={size} color={color} />
				{value > 0 && (
					<View
						style={[
							styles.badge,
							{
								backgroundColor: badgeColor,
								width: badgeSize,
								height: badgeSize,
								borderRadius: badgeSize / 2,
							},
						]}
					>
						<Text
							style={[
								styles.badgeText,
								{
									fontSize,
								},
							]}
						>
							{value}
						</Text>
					</View>
				)}
			</View>
		</Pressable>
	);
}

export default Badge;
