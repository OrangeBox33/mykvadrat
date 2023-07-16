import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_X, DEFAULT_Y, HISTORY_SIZE, PALETTE } from '../utils/constants';
import { Grid, History, Id } from '../utils/types';
import { createGrid } from '../utils/utils';

export interface MainState {
	grid: Grid;
	selectedColor: string;
	history: History;
}

const initialState: MainState = {
	grid: createGrid(DEFAULT_X * DEFAULT_Y),
	selectedColor: PALETTE[0],
	history: [],
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setPixel: (state, action: PayloadAction<Id>) => {
			const id = action.payload;
			state.history.push({ id, color: state.grid[id] });
			if (state.history.length > HISTORY_SIZE) {
				state.history.shift();
			}
			state.grid[id] = state.selectedColor;
		},
		setSelectedColor: (state, action: PayloadAction<string>) => {
			state.selectedColor = action.payload;
		},
		popHistory: state => {
			const { id, color } = state.history[state.history.length - 1];
			state.grid[id] = color;
			state.history.pop();
		},
	},
});

export const selectSelectedColor = (state: MainState) => state.selectedColor;

export const { setSelectedColor, popHistory, setPixel } = mainSlice.actions;

export const mainReducer = mainSlice.reducer;
