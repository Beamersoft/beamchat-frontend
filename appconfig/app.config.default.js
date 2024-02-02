const CONFIG = (config, NODE_ENV) => {
	const localConfig = {
		...config,
		extra: {
			...config.extra,
			API_URL: 'https://api.groundzeroland.com/',
			HOST: 'api.groundzeroland.com',
			BUNDLER_APP_ID: 'com.beamchat.app',
			NODE_ENV,
		},
	};

	localConfig.android.googleServicesFile = './dev/google-services.json';
	localConfig.ios.googleServicesFile = './dev/GoogleService-Info.plist';

	if (NODE_ENV.toLowerCase() === 'qa') {
		localConfig.ios.bundleIdentifier = 'com.beamchat.app';
		localConfig.extra = {
			API_URL: 'https://api.groundzeroland.com/',
			HOST: 'api.groundzeroland.com',
			BUNDLER_APP_ID: 'com.beamchat.app',
			NODE_ENV,
		};
		localConfig.extra.eas = {
			projectId: 'complete_this',
		};
	}

	if (NODE_ENV.toLowerCase() === 'prod') {
		localConfig.ios.bundleIdentifier = 'com.beamchat.app';
		localConfig.ios.googleServicesFile = './prod/GoogleService-Info.plist';
		localConfig.extra = {
			API_URL: 'https://api.groundzeroland.com/',
			HOST: 'api.groundzeroland.com',
			BUNDLER_APP_ID: 'com.beamchat.app',
			NODE_ENV,
		};
		localConfig.extra.eas = {
			projectId: 'complete_this',
		};
	}

	return localConfig;
};

module.exports = CONFIG;
