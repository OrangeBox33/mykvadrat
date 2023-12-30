import {
	DEFAULT_COLOR,
	DEFAULT_X,
	DEFAULT_Y,
	ARDUINO_ACTIONS,
	BRIGHTNESS_DEVISION,
} from './constants.js';

export const createGrid = () => {
	const grid = [];
	for (let i = 0; i < DEFAULT_X * DEFAULT_Y; i++) {
		grid[i] = DEFAULT_COLOR;
	}

	return grid;
};

export const hexToRgb = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
		: [0, 0, 0];
};

export const convertGridForArduino = (grid) => {
	const gridForArduino = [];

	for (let id = 0; id < grid.length; id++) {
		const posY = Math.floor(id / DEFAULT_X);

		// выбираю нечётные позиции по Y. Для них нужно инвертировать id
		if (posY % 2 === 0) {
			gridForArduino[id] = grid[posY * DEFAULT_X + DEFAULT_X - 1 - (id % DEFAULT_X)];
		} else {
			gridForArduino[id] = grid[id];
		}
	}

	return gridForArduino;
};

export const convertIdForArduino = (id) => {
	const posY = Math.floor(id / DEFAULT_X);

	// выбираю нечётные позиции по Y. Для них нужно инвертировать id
	if (posY % 2 === 0) {
		return posY * DEFAULT_X + DEFAULT_X - 1 - (id % DEFAULT_X);
	} else {
		return id;
	}
};

export const sleep = async (timeout) => {
	return new Promise((res) => {
		setTimeout(res, timeout);
	});
};

export const makeAndSendGridToArduino = (grid, arduinoClient) => {
	if (arduinoClient.client) {
		const arrForArduino = [ARDUINO_ACTIONS.GRID];

		for (let id = 0; id < grid.length; id++) {
			const rgbArr256 = hexToRgb(grid[convertIdForArduino(id)]);
			const rgbArr32 = rgbArr256.map((value) => Math.floor(value / BRIGHTNESS_DEVISION));

			arrForArduino.push(id, ...rgbArr32);
		}

		arduinoClient.client.send(new Uint8Array(arrForArduino));
	}
};

export const makeAndSendPixelsToArduino = (pixels, arduinoClient) => {
	if (arduinoClient.client) {
		const arrForArduino = [ARDUINO_ACTIONS.DRAW];

		for (const pixel of pixels) {
			const { id, color } = pixel;

			const rgbArr256 = hexToRgb(color);
			const rgbArr32 = rgbArr256.map((value) => Math.floor(value / BRIGHTNESS_DEVISION));

			arrForArduino.push(convertIdForArduino(id), ...rgbArr32);
		}

		arduinoClient.client.send(new Uint8Array(arrForArduino));
	}
};
