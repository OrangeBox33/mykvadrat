import { FC, useState } from 'react';
import { StyledPalettePixel } from './PalettePixel.styled';

interface IProps {
	color: string;
	isActive: boolean;
	handleClick: (color: string) => void;
}

export const PalettePixel: FC<IProps> = ({ color, isActive, handleClick }) => {
	return (
		<>
			<StyledPalettePixel color={color} isActive={isActive} onClick={() => handleClick(color)} />
		</>
	);
};
