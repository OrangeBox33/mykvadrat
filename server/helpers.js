import { DEFAULT_COLOR, DEFAULT_X, DEFAULT_Y } from './constants.js';

export const replacer = (key, value) => {
	if (value instanceof Map) {
		return {
			dataType: 'Map',
			value: Array.from(value.entries()),
		};
	} else {
		return value;
	}
};

export const reviver = (key, value) => {
	if (typeof value === 'object' && value !== null) {
		if (value.dataType === 'Map') {
			return new Map(value.value);
		}
	}
	return value;
};

export const createGrid = () => {
	const grid = {};
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

export const convertPixelsForArduino = () => {};
