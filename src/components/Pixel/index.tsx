import { FC, MouseEvent } from 'react';
import { StyledPixel } from './Pixel.styled';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MainState, selectSelectedColor, setAndSendPixel } from '../../redux/slice';

interface IProps {
	id: number;
}

export const Pixel: FC<IProps> = ({ id }) => {
	const pixelColor = useAppSelector((state: MainState) => state.grid[id]);
	const selectedColor = useAppSelector(selectSelectedColor);
	const dispatch = useAppDispatch();

	const handleHover = (e: MouseEvent) => {
		if (e.buttons === 1 && pixelColor !== selectedColor) {
			dispatch(setAndSendPixel(id));
		}
	};

	const handleMouseDown = () => {
		if (pixelColor !== selectedColor) {
			dispatch(setAndSendPixel(id));
		}
	};

	return <StyledPixel color={pixelColor} onMouseOver={handleHover} onMouseDown={handleMouseDown} />;
};
