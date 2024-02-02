import React from 'react';

import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';

import * as Updates from 'expo-updates';

import errorJSON from '../assets/lotties/error.json';

class FallbackComponent extends React.Component {
	componentDidMount() {
		this.animation.play();
	}

	resetAnimation = () => {
		this.animation.reset();
		this.animation.play();
	};

	render() {
		return (
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1,
					backgroundColor: '#EEE',
				}}
			>
				<LottieView
					ref={(animation) => {
						this.animation = animation;
					}}
					style={{
						width: 250,
						height: 250,
						backgroundColor: '#fefefe',
					}}
					source={errorJSON}
				/>
				<Text style={{ fontSize: 20 }}>
					Houston...
				</Text>
				<Text>
					tenemos un problema.
				</Text>
				<TouchableOpacity
					onPress={() => Updates.reloadAsync()}
					style={{
						backgroundColor: '#b50d1d',
						paddingVertical: 4,
						paddingHorizontal: 8,
						borderRadius: 6,
						marginTop: 24,
						height: 44,
						justifyContent: 'center',
						alignItems: 'center',
					}}
					activeOpacity={0.8}
				>
					<Text style={{ color: '#FAFAFA' }}>
						Recargar la aplicación
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default FallbackComponent;
