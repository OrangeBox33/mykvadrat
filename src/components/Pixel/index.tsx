import { MouseEvent, memo } from 'react';
import { StyledPixel } from './Pixel.styled';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectPixelColor, selectSelectedColor, setAndSendPixel } from '../../redux/slice';

interface IProps {
	id: number;
}

export const Pixel = memo<IProps>(({ id }) => {
	const pixelColor = useAppSelector(selectPixelColor(id));
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
});
