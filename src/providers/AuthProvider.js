import React, {
	useState,
	useEffect,
} from 'react';

import { jwtDecode } from 'jwt-decode';
import { onlineManager } from 'react-query';
import NetInfo from '@react-native-community/netinfo';

import { AuthProvider } from './AuthContext';
import { generateDeviceId } from '../helpers/deviceid';

import {
	getData,
	storeData,
	sessionLocalKey,
	clearAllLocalStorage,
	sessionRefreshTokenLocalKey,
} from '../helpers/StorageData';

import socket from '../api/socket';

function AppProviderContext({ children }) {
	const [logged, setLogged] = useState(false);
	const [userData, setUserData] = useState();
	const [deviceId, setDeviceId] = useState();
	const [boot, setBoot] = useState(false);
	const [loading, setLoading] = useState(false);
	const [networkStatus, setNetworkStatus] = useState({
		connected: false,
		connectedType: null,
	});
	const [socketConnected, setSocketConnected] = useState(false);

	async function logout() {
		await clearAllLocalStorage();
		setLogged(false);
		setUserData(undefined);
	}

	async function getCurrentNetworkStatus() {
		try {
			const currentNetworkStatus = await NetInfo.fetch();
			setNetworkStatus({
				connected: currentNetworkStatus.isConnected,
				connectedType: currentNetworkStatus.type,
			});
			return {
				connected: currentNetworkStatus.isConnected,
				connectedType: currentNetworkStatus.type,
			};
		} catch (err) {
			console.error(`getCurrentNetworkStatus Error: ${err}`, 'AuthProvider.js');
		}
		return { connected: false, connectedType: null };
	}

	async function checkTokenTTL() {
		try {
			const localToken = await getData(sessionLocalKey);
			if (localToken) {
				const decoded = jwtDecode(localToken.jwt);
				if (((new Date().getTime() / 1000) - (decoded.exp)) > -360) {
					await logout();

					// TODO: Implement logic for refresh token
				}
			}
		} catch (err) {
			console.info('Error checkTokenTTL: ', err);
		}
	}

	async function getLocalToken() {
		try {
			await getCurrentNetworkStatus();
			const id = await generateDeviceId();
			setDeviceId(id);
			const localToken = await getData(sessionLocalKey);
			if (localToken) {
				const decoded = jwtDecode(localToken.jwt);
				if (Date.now() >= decoded.exp * 1000) {
					setLogged(false);
				} else {
					const data = await getData('userData');
					setLogged(true);
					if (data) setUserData(data);
				}
			}
			setBoot(true);
			await storeData('end', 'initStatus');
		} catch (err) {
			console.error('Error getLocalToken process:', err, 'AuthProvider.js');
			setLogged(false);
		}
	}

	useEffect(() => {
		function onConnect() {
			setSocketConnected(true);
			console.info('[Socket] connected!');
		}

		function onDisconnect() {
			setSocketConnected(false);
			console.info('[Socket] disconnected!');
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
	}, []);

	useEffect(() => {
		onlineManager.setEventListener((setOnline) => NetInfo.addEventListener((state) => setOnline(state.isConnected)));
	}, []);

	useEffect(() => {
		getLocalToken();
		let unsubscribe = () => {};
		try {
			let firstTime = true;
			unsubscribe = NetInfo.addEventListener((currentNetworkStatus) => {
				if (firstTime) {
					firstTime = false;
					return;
				}
				setNetworkStatus({
					connected: currentNetworkStatus.isConnected,
					connectedType: currentNetworkStatus.type,
				});
			});
		} catch (err) {
			console.error(`error effect interval location and network: ${err}`, 'AuthProvider.js');
		}

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		const intervalTTLToken = setInterval(() => {
			checkTokenTTL();
		}, 60 * 1000);

		checkTokenTTL();
		return () => clearInterval(intervalTTLToken);
	}, []);

	return (
		<AuthProvider
			value={{
				userData,
				setUserData,
				logged,
				setLogged,
				loading,
				setLoading,
				...networkStatus,
				storeData,
				setToken: async (accessToken, refreshUserToken) => {
					await storeData({ jwt: accessToken }, sessionLocalKey);
					await storeData({ jwt: refreshUserToken }, sessionRefreshTokenLocalKey);
					await getLocalToken();
				},
				boot,
				logout,
				deviceId,
				socketConnected,
			}}
		>
			{children}
		</AuthProvider>
	);
}

export default AppProviderContext;
