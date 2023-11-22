import { socket } from '../socket';
import { BRUSH, PENCIL } from '../utils/constants';
import { Id, PlayHistoryData, ChatMessage } from '../utils/types';
import { needPaintPixels, sleep } from '../utils/utils';
import { pushHistory, setPixels, popHistory, setGrid } from './slice';
import { AppThunk } from './store';

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

				if (socket.readyState === socket.OPEN) {
					const data = JSON.stringify({ pixels, type: 'draw' });
					await socket.send(data);
				}
			}
		}

		if (brushType === PENCIL) {
			const pixels = [{ id, color: selectedColor }];

			dispatch(pushHistory([id]));
			dispatch(setPixels(pixels));

			if (socket.readyState === socket.OPEN) {
				const data = JSON.stringify({ pixels, type: 'draw' });
				await socket.send(data);
			}
		}
	};

export const undo = (): AppThunk => async (dispatch, getState) => {
	const { history } = getState();
	const pixels = history.at(-1);

	dispatch(setPixels(pixels!));
	dispatch(popHistory());

	if (socket.readyState === socket.OPEN) {
		const data = JSON.stringify({ pixels, type: 'draw' });
		await socket.send(data);
	}
};

export const fetchHistory = (): AppThunk => async () => {
	if (socket.readyState === socket.OPEN) {
		const data = JSON.stringify({ type: 'history' });
		await socket.send(data);
	}
};

export const resetServerHistory = (): AppThunk => async () => {
	if (socket.readyState === socket.OPEN) {
		const data = JSON.stringify({ type: 'resetHistory' });
		await socket.send(data);
	}
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

export const sendMessage =
	({ username, text }: ChatMessage): AppThunk =>
	async () => {
		const data = JSON.stringify({ type: 'sendToChat', chatMessage: { username, text } });
		socket.send(data);
	};
