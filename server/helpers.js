import { DEFAULT_COLOR, DEFAULT_X, DEFAULT_Y } from './constants.js';

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
