import { FC, MouseEvent, useState } from 'react';
import { StyledPixel } from './Pixel.styled';
import { DEFAULT_COLOR } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { pushHistory, selectSelectedColor } from '../../redux/slice';

interface IProps {
	id: number;
}

export const Pixel: FC<IProps> = ({ id }) => {
	const [color, setColor] = useState(DEFAULT_COLOR);
	const selectedColor = useAppSelector(selectSelectedColor);
	const dispatch = useAppDispatch();

	const handleHover = (e: MouseEvent) => {
		if (e.buttons === 1) {
			dispatch(pushHistory({ id, color }));
			setColor(selectedColor);
		}
	};

	const handleMouseDown = () => {
		dispatch(pushHistory({ id, color }));
		setColor(selectedColor);
	};

	return <StyledPixel color={color} onMouseOver={handleHover} onMouseDown={handleMouseDown} />;
};
