const socket = new WebSocket('ws://188.225.60.209:81');

export const openWSConnection = () => {
	socket.onopen = () => console.log('ws opened');
	socket.onclose = () => console.log('ws closed');

	return socket;
};
