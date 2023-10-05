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
