import Colors from './colors';
import Sizes from './sizes';

export default function Theme(DefaultTheme = {}) {
	const theme = { ...DefaultTheme };

	theme.colors = { ...Colors };
	theme.sizes = { ...Sizes };

	return theme;
}
