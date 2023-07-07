import { FC, useState } from 'react';
import { createArr, createGridData } from '../../utils/utils';
import { DEFAULT_X, DEFAULT_Y } from '../../utils/constants';
import { Pixel } from '../Pixel';
import { StyledGrid, StyledGridRow } from './Grid.styled';

export const Grid: FC = () => {
	return (
		<StyledGrid>
			{createArr(DEFAULT_X * DEFAULT_Y).map((v, index) => (
				<Pixel key={index} id={index} />
			))}
		</StyledGrid>
	);
};
