import { playHistory, setGridFromServer, setPixelFromServer } from './redux/slice';
import { store } from './redux/store';
import ReconnectingWebSocket from 'reconnecting-websocket';

export const socket = new ReconnectingWebSocket('wss://kvadratnikitosa.ru');

// socket.addEventListener('open', () => {
// 	console.log('ws open');
// 	socket.send(JSON.stringify({ type: 'getGrid' }));
// });

// socket.addEventListener('close', () => {
// 	console.log('ws close');
// });

socket.addEventListener('message', (message) => {
	const { type, pixels, grid, oldGrid, history } = JSON.parse(message.data);
	if (type === 'draw') {
		store.dispatch(setPixelFromServer(pixels));
	}

	if (type === 'getGrid') {
		store.dispatch(setGridFromServer(grid));
	}

	if (type === 'history') {
		store.dispatch(playHistory({ oldGrid, history }));
	}
});
