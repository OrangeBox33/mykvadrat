import { DEFAULT_COLOR } from './constants';

export const createGridData = (sizeX: number, sizeY: number) => {
	const arr = [];
	let index = 0;

	for (let i = 0; i < sizeY; i++) {
		for (let j = 0; j < sizeX; i++) {
			arr.push({ id: index, color: DEFAULT_COLOR });
		}
	}

	return arr;
};

export const createArr = (size: number) => {
	const arr: number[] = [];
	for (let i = 0; i < size; i++) {
		arr.push(i);
	}
	return arr;
};
