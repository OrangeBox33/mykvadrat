import { addMessage, setChat, setGrid, setPixels } from './redux/slice';
import { store } from './redux/store';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { playHistory } from './redux/thunk';

export const socket = new ReconnectingWebSocket('wss://kvadratnikitosa.ru');

// socket.addEventListener('open', () => {
// 	console.log('ws open');
// 	socket.send(JSON.stringify({ type: 'getGrid' }));
// });

// socket.addEventListener('close', () => {
// 	console.log('ws close');
// });

socket.addEventListener('message', (message) => {
	const { type, pixels, grid, oldGrid, history, chat, chatMessage } = JSON.parse(message.data);
	if (type === 'draw') {
		store.dispatch(setPixels(pixels));
	}

	if (type === 'getGrid') {
		store.dispatch(setGrid(grid));
	}

	if (type === 'playHistory') {
		store.dispatch(playHistory({ oldGrid, history }));
	}

	if (type === 'getChat') {
		store.dispatch(setChat(chat));
	}

	if (type === 'sendToChat') {
		store.dispatch(addMessage(chatMessage));
	}
});
