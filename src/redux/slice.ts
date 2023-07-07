import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PALETTE } from '../utils/constants';
import { HistoryElement, History } from '../utils/types';

export interface MainState {
	selectedColor: string;
	history: History;
}

const initialState: MainState = {
	selectedColor: PALETTE[0],
	history: [],
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setSelectedColor: (state, action: PayloadAction<string>) => {
			state.selectedColor = action.payload;
		},
		pushHistory: (state, action: PayloadAction<HistoryElement>) => {
			state.history.push(action.payload);
		},
		popHistory: state => {
			state.history.pop();
		},
	},
});

export const selectSelectedColor = (state: MainState) => state.selectedColor;

export const { setSelectedColor, pushHistory, popHistory } = mainSlice.actions;

export const mainReducer = mainSlice.reducer;
