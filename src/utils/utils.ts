import { DEFAULT_COLOR } from './constants';

export const createGrid = (size: number) => {
	const grid: Record<number, string> = {};
	for (let i = 0; i < size; i++) {
		grid[i] = DEFAULT_COLOR;
	}

	return grid;
};

export const createArr = (size: number) => {
	const arr: number[] = [];
	for (let i = 0; i < size; i++) {
		arr.push(i);
	}

	return arr;
};
