import {
	SafeAreaView,
	useWindowDimensions,
	ScrollView,
	ImageBackground,
} from 'react-native';

import LoadingModalSpinner from '../LoadingModalSpinner';
import NotNetwork from '../NoNetwork';

function BackgroundImage({
	backgroundImage,
	children,
	backgroundHeight,
}) {
	if (!backgroundImage) {
		return children;
	}

	return (
		<ImageBackground
			source={backgroundImage}
			defaultSource={backgroundImage}
			imageStyle={{
				height: backgroundHeight,
			}}
		>
			{children}
		</ImageBackground>
	);
}

function Screen({
	testID,
	scrollTestID,
	children,
	headerComponent,
	backgroundColor = '#FFFFFF',
	footerComponent,
	safe = true,
	refreshControl,
	paddingHorizontal = 16,
	isLoading,
	contentStyle,
	ControlComponent,
	backgroundImage,
	backgroundHeight,
	headerSpace,
	statusBarStyle,
	statusBarColor,
	screenName,
	...style
}) {
	const { height, width } = useWindowDimensions();
	function HeaderComponent() {
		return headerComponent;
	}

	function FooterComponent() {
		return footerComponent;
	}

	return (
		<SafeAreaView
			testID={testID}
			style={{
				height,
				flex: 1,
			}}
		>
			<NotNetwork />
			<BackgroundImage backgroundHeight={backgroundHeight} backgroundImage={backgroundImage}>
				{safe && (
					<>
						<HeaderComponent />
						<ScrollView
							testID={scrollTestID}
							style={{
								width,
								backgroundColor,
								height: height + 60,
								marginTop: headerSpace || 0,
							}}
							paddingHorizontal={paddingHorizontal}
							refreshControl={refreshControl}
							{...style}
						>
							{children}
						</ScrollView>
					</>
				)}
				{!safe && (
					<>
						<HeaderComponent />
						{children}
					</>
				)}
			</BackgroundImage>
			{isLoading ? (<LoadingModalSpinner visible={isLoading} />) : null}
			{footerComponent && (
				<FooterComponent />
			)}
		</SafeAreaView>
	);
}

export default Screen;
