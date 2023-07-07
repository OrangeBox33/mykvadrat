import { FC, useState } from 'react';
import { PALETTE } from '../../utils/constants';
import { ColorPixel } from '../ColorPixel';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectSelectedColor, setSelectedColor } from '../../redux/slice';
import { StyledPalette } from './Palette.styled';

export const Palette: FC = () => {
	const selectedColor = useAppSelector(selectSelectedColor);
	const dispatch = useAppDispatch();

	const handleClick = (color: string) => dispatch(setSelectedColor(color));

	return (
		<StyledPalette>
			{PALETTE.map(color => (
				<ColorPixel
					key={color}
					color={color}
					isActive={color === selectedColor}
					handleClick={handleClick}
				/>
			))}
		</StyledPalette>
	);
};
