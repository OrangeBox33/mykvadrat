import { FC, MouseEvent, useState } from 'react';
import { StyledPixel } from './Pixel.styled';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MainState, setPixel } from '../../redux/slice';

interface IProps {
	id: number;
}

export const Pixel: FC<IProps> = ({ id }) => {
	const pixelColor = useAppSelector((state: MainState) => state.grid[id]);
	const dispatch = useAppDispatch();

	const handleHover = (e: MouseEvent) => {
		if (e.buttons === 1) {
			dispatch(setPixel(id));
		}
	};

	const handleMouseDown = () => {
		dispatch(setPixel(id));
	};

	return <StyledPixel color={pixelColor} onMouseOver={handleHover} onMouseDown={handleMouseDown} />;
};
