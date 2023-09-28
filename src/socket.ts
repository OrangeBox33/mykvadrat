import { setGridFromServer, setPixelFromServer } from './redux/slice';
import { store } from './redux/store';

export const socket = new WebSocket('wss://kvadratnikitosa.ru');

export const openWSConnection = () => {
	socket.onopen = () => console.log('ws opened');
	socket.onclose = () => console.log('ws closed');

	return socket;
};

socket.onmessage = message => {
	const { type, id, color, grid } = JSON.parse(message.data);
	if (type === 'draw') {
		store.dispatch(setPixelFromServer({ id, color }));
	}

	if (type === 'getGrid') {
		store.dispatch(setGridFromServer(grid));
	}
};
