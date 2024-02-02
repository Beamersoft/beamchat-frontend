import Theme from '../themes/default';

const theme = Theme();

function Colors(color) {
	if (color) {
		if (color in theme.colors.primary) {
			return theme.colors.primary[color];
		}
		if (color in theme.colors.category) {
			return theme.colors.category[color];
		}
	}
}
export default Colors;
