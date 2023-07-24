import { FC, MouseEvent } from 'react';
import { StyledPixel } from './Pixel.styled';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MainState, setAndSendPixel } from '../../redux/slice';

interface IProps {
	id: number;
}

export const Pixel: FC<IProps> = ({ id }) => {
	const pixelColor = useAppSelector((state: MainState) => state.grid[id]);
	const dispatch = useAppDispatch();

	const handleHover = (e: MouseEvent) => {
		if (e.buttons === 1) {
			dispatch(setAndSendPixel(id));
		}
	};

	const handleMouseDown = () => {
		dispatch(setAndSendPixel(id));
	};

	return <StyledPixel color={pixelColor} onMouseOver={handleHover} onMouseDown={handleMouseDown} />;
};
