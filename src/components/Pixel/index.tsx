import { MouseEvent, memo } from 'react';
import { StyledPixel } from './Pixel.styled';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectBrushType, selectPixelColor, selectSelectedColor, setAndSendPixel } from '../../redux/slice';
import { DeviceType } from '../../utils/types';

interface IProps {
	id: number;
	deviceType: DeviceType;
}

export const Pixel = memo<IProps>(({ id, deviceType }) => {
	const pixelColor = useAppSelector(selectPixelColor(id));
	const selectedColor = useAppSelector(selectSelectedColor);
	const brushType = useAppSelector(selectBrushType);
	const dispatch = useAppDispatch();

	const handleHover = (e: MouseEvent) => {
		if (deviceType === 0 && e.buttons === 1 && pixelColor !== selectedColor) {
			dispatch(setAndSendPixel(id));
		}
	};

	const handleMouseDown = () => {
		if (pixelColor !== selectedColor) {
			dispatch(setAndSendPixel(id));
		}
	};

	return <StyledPixel color={pixelColor} onMouseOver={handleHover} onMouseDown={handleMouseDown}></StyledPixel>;
});
