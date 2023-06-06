import { FC, MouseEvent, useState } from 'react';
import { StyledPixel } from './Pixel.styled';
import { DEFAULT_COLOR } from '../../utils/constants';

interface IProps {
	id: number;
}

export const Pixel: FC<IProps> = ({ id }) => {
	const [color, setColor] = useState(DEFAULT_COLOR);

	const handleHover = (e: MouseEvent) => {
		console.log(e);
		if (e.buttons === 1) {
		}
	};

	return <StyledPixel color={color} onMouseOver={handleHover} />;
};
