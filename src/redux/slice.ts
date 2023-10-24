import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	DEFAULT_X,
	DEFAULT_Y,
	UNDO_SIZE,
	PALETTE,
	EBrushType,
	PENCIL,
	BRUSH,
} from '../utils/constants';
import { Grid, History, Id, Ids, Pixel, PlayHistoryData } from '../utils/types';
import { createGrid, needPaintPixels, sleep } from '../utils/utils';
import { socket } from '../socket';
import { AppThunk } from './store';

export interface MainState {
	grid: Grid;
	selectedColor: string;
	brushType: EBrushType;
	history: History;
}

const initialState: MainState = {
	grid: createGrid(DEFAULT_X * DEFAULT_Y),
	selectedColor: PALETTE[0],
	brushType: PENCIL,
	history: [],
};

export const setAndSendPixel =
	(id: Id): AppThunk =>
	async (dispatch, getState) => {
		const { selectedColor, brushType, grid } = getState();
		if (brushType === BRUSH) {
			const allNeedPaintIds = needPaintPixels(id);

			const realNeedPaintIds = allNeedPaintIds.filter((id) => grid[id] !== selectedColor);

			if (realNeedPaintIds.length) {
				const pixels = realNeedPaintIds.map((id) => ({ id, color: selectedColor }));

				dispatch(pushHistory(realNeedPaintIds));
				dispatch(setPixels(pixels));

				const data = JSON.stringify({ pixels, type: 'draw' });
				await socket.send(data);
			}
		}

		if (brushType === PENCIL) {
			const pixels = [{ id, color: selectedColor }];

			dispatch(pushHistory([id]));
			dispatch(setPixels(pixels));

			const data = JSON.stringify({ pixels, type: 'draw' });
			await socket.send(data);
		}
	};

export const undo = (): AppThunk => async (dispatch, getState) => {
	const { history } = getState();
	const pixels = history.at(-1);

	dispatch(setPixels(pixels!));
	dispatch(popHistory());

	const data = JSON.stringify({ pixels, type: 'draw' });
	await socket.send(data);
};

export const fetchHistory = (): AppThunk => async () => {
	const data = JSON.stringify({ type: 'history' });
	await socket.send(data);
};

export const resetServerHistory = (): AppThunk => async () => {
	const data = JSON.stringify({ type: 'resetHistory' });
	await socket.send(data);
};

export const setPixelFromServer =
	(pixels: Pixel[]): AppThunk =>
	async (dispatch) => {
		dispatch(setPixels(pixels));
	};

export const setGridFromServer =
	(grid: Grid): AppThunk =>
	async (dispatch) => {
		dispatch(setGrid(grid));
	};

export const playHistory =
	({ oldGrid, history }: PlayHistoryData): AppThunk =>
	async (dispatch) => {
		await dispatch(setGrid(oldGrid));

		for (let i = 0; i < history.length; i++) {
			await sleep(15);
			await dispatch(setPixels(history[i]));
		}
	};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setPixels: (state, action: PayloadAction<Pixel[]>) => {
			for (const pixel of action.payload) {
				const { id, color } = pixel;
				state.grid[id] = color;
			}
		},

		pushHistory: (state, action: PayloadAction<Ids>) => {
			const ids = action.payload;
			const historyElement = ids.map((id) => ({ id, color: state.grid[id] }));
			state.history.push(historyElement);
			if (state.history.length > UNDO_SIZE) {
				state.history.shift();
			}
		},

		setSelectedColor: (state, action: PayloadAction<string>) => {
			state.selectedColor = action.payload;
		},

		popHistory: (state) => {
			state.history.pop();
		},

		setGrid: (state, action: PayloadAction<Grid>) => {
			const gridFromServer = action.payload;

			for (const id in gridFromServer) {
				state.grid[id] = gridFromServer[id];
			}
		},

		changeBrushType: (state, action: PayloadAction<EBrushType>) => {
			state.brushType = action.payload;
		},
	},
});

export const selectSelectedColor = (state: MainState) => state.selectedColor;
export const selectGrid = (state: MainState) => state.grid;
export const selectPixelColor = (id: number) => (state: MainState) => state.grid[id];
export const selectEmptyHistory = (state: MainState) => state.history.length === 0;
export const selectBrushType = (state: MainState) => state.brushType;

export const { setPixels, setSelectedColor, pushHistory, popHistory, setGrid, changeBrushType } =
	mainSlice.actions;

export const mainReducer = mainSlice.reducer;
