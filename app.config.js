const DefaultConfig = require('./appconfig/app.config.default');

module.exports = ({ config }) => {
	let APP_NAME = 'beamchat';
	let NODE_ENV = 'qa';

	if (process.env && process.env.APP_NAME) APP_NAME = process.env.APP_NAME;
	if (process.env && process.env.NODE_ENV) NODE_ENV = process.env.NODE_ENV;

	let finalConfig = {};

	finalConfig = DefaultConfig(config, NODE_ENV);

	finalConfig.extra.APP_NAME = APP_NAME;

	return finalConfig;
};
