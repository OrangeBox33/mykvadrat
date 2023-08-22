import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_X, DEFAULT_Y, HISTORY_SIZE, PALETTE } from '../utils/constants';
import { Grid, History, Id, Pixel } from '../utils/types';
import { createGrid } from '../utils/utils';
import { openWSConnection } from '../socket';
import { AppThunk } from './store';

const socket = openWSConnection();

socket.onmessage = message => {
	const data = message.data;
	console.log(data);
};

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

// export const sendPixel = createAsyncThunk('sendPixel', async (pixel: Pixel) => {
// 	await socket.send(JSON.stringify(pixel));
// 	return;
// });

// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
// 	state: RootState;
// 	dispatch: AppDispatch;
// 	rejectValue: string;
// }>();

export const setAndSendPixel =
	(id: number): AppThunk =>
	async (dispatch, getState) => {
		const { selectedColor } = getState();
		dispatch(setPixel({id, color: selectedColor}));
		const data = JSON.stringify({ id, color: selectedColor });
		// await socket.send(data);
	};

export const setPixelFromServer = ({id, color}:{id: number, color: string}): AppThunk =>
	async (dispatch) => {
		dispatch(setPixel({id, color}));
	};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setPixel: (state, action: PayloadAction<Pixel>) => {
			const {id, color} = action.payload;
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
			const { id, color } = state.history[state.history.length - 1];
			state.grid[id] = color;
			state.history.pop();
			const data = JSON.stringify({ id, color: state.grid[id] });
			socket.send(data);
		},
	},
});

export const selectSelectedColor = (state: MainState) => state.selectedColor;

export const { setSelectedColor, popHistory, setPixel } = mainSlice.actions;

export const mainReducer = mainSlice.reducer;
