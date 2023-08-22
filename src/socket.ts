const socket = new WebSocket('ws://5.44.46.7:81');

export const openWSConnection = () => {
	socket.onopen = () => console.log('ws opened');
	socket.onclose = () => console.log('ws closed');

	return socket;
};
