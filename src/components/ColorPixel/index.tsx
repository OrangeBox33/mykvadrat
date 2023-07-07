import { FC, useState } from 'react';
import { StyledColorPixel } from './ColorPixel.styled';

interface IProps {
	color: string;
	isActive: boolean;
	handleClick: (color: string) => void;
}

export const ColorPixel: FC<IProps> = ({ color, isActive, handleClick }) => {
	return (
		<>
			<StyledColorPixel color={color} isActive={isActive} onClick={() => handleClick(color)} />
		</>
	);
};
