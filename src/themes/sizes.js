import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const RegularSizes = {
	regular: {
		weight: '400',
	},
	semibold: {
		weight: '600',
	},
	bold: {
		weight: '700',
	},
	8: '8',
	10: '10',
	12: '12',
	13: '13',
	14: '14',
	16: '16',
	18: '18',
	20: '20',
	22: '22',
	24: '24',
	26: '26',
	28: '28',
	30: '30',
	32: '32',
	36: '36',
};

const ModifiedSizes = {
	regular: {
		weight: '400',
	},
	semibold: {
		weight: '600',
	},
	bold: {
		weight: '700',
	},
	8: '14',
	10: '14',
	12: '14',
	13: '13',
	14: '16',
	16: '16',
	18: '18',
	20: '20',
	22: '22',
	24: '24',
	26: '26',
	28: '28',
	30: '30',
	32: '32',
	36: '36',
};

const Sizes = windowHeight > 320 ? ModifiedSizes : RegularSizes;

export default Sizes;
