import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PALETTE } from '../utils/constants';

export interface MainState {
	selectedColor: string;
}

const initialState: MainState = {
	selectedColor: PALETTE[0],
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setSelectedColor: (state, action: PayloadAction<string>) => {
			state.selectedColor = action.payload;
		},
	},
});

export const selectSelectedColor = (state: MainState) => state.selectedColor;

export const { setSelectedColor } = mainSlice.actions;

export const mainReducer = mainSlice.reducer;
