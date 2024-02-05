/* eslint camelcase: "off" */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as Localization from 'expo-localization';
import moment from 'moment/moment';
import en from './locales/en.json';

const locale = Localization.locale ? Localization.locale.split('-').shift() : 'es';

moment.updateLocale(locale, {
	months: en.translation.MONTH_NAMES,
});

i18n.use(initReactI18next).init({
	lng: Localization.locale ? Localization.locale.split('-').shift() : 'en',
	fallbackLng: 'es_MX',
	compatibilityJSON: 'v3',
	debug: false,
	resources: {
		en,
	},
	interpolation: {
		escapeValue: false, // react already safes from xss
	},
});

export default i18n;
