import { FC, MouseEvent, useState } from 'react';
import { StyledPixel } from './Pixel.styled';
import { DEFAULT_COLOR } from '../../utils/constants';
import { useAppSelector } from '../../redux/hooks';
import { selectSelectedColor } from '../../redux/slice';

interface IProps {
	id: number;
}

export const Pixel: FC<IProps> = ({ id }) => {
	const [color, setColor] = useState(DEFAULT_COLOR);
	const selectedColor = useAppSelector(selectSelectedColor);

	const handleHover = (e: MouseEvent) => {
		if (e.buttons === 1) {
			setColor(selectedColor);
		}
	};

	const handleMouseDown = () => setColor(selectedColor);

	return <StyledPixel color={color} onMouseOver={handleHover} onMouseDown={handleMouseDown} />;
};
