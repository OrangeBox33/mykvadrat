import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_X, DEFAULT_Y, HISTORY_SIZE, PALETTE } from '../utils/constants';
import { Grid, History, Id, Pixel, PlayHistoryData } from '../utils/types';
import { createGrid, sleep } from '../utils/utils';
import { socket } from '../socket';
import { AppThunk } from './store';

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

export const setAndSendPixel =
	(id: number): AppThunk =>
	async (dispatch, getState) => {
		const { selectedColor } = getState();
		dispatch(pushHistory(id));
		dispatch(setPixel({ id, color: selectedColor }));
		const data = JSON.stringify({ id, color: selectedColor, type: 'draw' });
		await socket.send(data);
	};

export const undo = (): AppThunk => async (dispatch, getState) => {
	const { history } = getState();
	const { id, color } = history[history.length - 1];
	dispatch(setPixel({ id, color }));
	dispatch(popHistory());
	const data = JSON.stringify({ id, color, type: 'draw' });
	await socket.send(data);
};

export const test1 = (): AppThunk => async (dispatch, getState) => {
	const data = JSON.stringify({ type: 'history' });
	await socket.send(data);
};

export const setPixelFromServer =
	({ id, color }: Pixel): AppThunk =>
	async dispatch => {
		dispatch(setPixel({ id, color }));
	};

export const setGridFromServer =
	(grid: Grid): AppThunk =>
	async dispatch => {
		dispatch(setGrid(grid));
	};

export const playHistory =
	({ oldGrid, history }: PlayHistoryData): AppThunk =>
	async dispatch => {
		console.log('pre');
		await dispatch(setGrid(oldGrid));
		console.log(history);
		for (let i = 0; i < history.length; i++) {
			await sleep(50);

			await dispatch(setPixel(history[i]));
		}
	};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setPixel: (state, action: PayloadAction<Pixel>) => {
			const { id, color } = action.payload;
			state.grid[id] = color;
		},

		pushHistory: (state, action: PayloadAction<Id>) => {
			const id = action.payload;
			state.history.push({ id, color: state.grid[id] });
			if (state.history.length > HISTORY_SIZE) {
				state.history.shift();
			}
		},

		setSelectedColor: (state, action: PayloadAction<string>) => {
			state.selectedColor = action.payload;
		},

		popHistory: state => {
			state.history.pop();
		},

		setGrid: (state, action: PayloadAction<Grid>) => {
			const gridFromServer = action.payload;

			for (const id in gridFromServer) {
				state.grid[id] = gridFromServer[id];
			}
		},
	},
});

export const selectSelectedColor = (state: MainState) => state.selectedColor;
export const selectGrid = (state: MainState) => state.grid;
export const selectPixelColor = (id: number) => (state: MainState) => state.grid[id];
export const selectEmptyHistory = (state: MainState) => state.history.length === 0;

export const { setPixel, setSelectedColor, pushHistory, popHistory, setGrid } = mainSlice.actions;

export const mainReducer = mainSlice.reducer;
