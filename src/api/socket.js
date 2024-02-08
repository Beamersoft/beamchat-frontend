import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3501';
const URL = 'http://10.0.2.2:3501';

const socket = io(URL, {
	autoConnect: false,
});

export default socket;
