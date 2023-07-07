import { FC, useState } from 'react';
import { createArr, createGridData } from '../../utils/utils';
import { DEFAULT_X, DEFAULT_Y } from '../../utils/constants';
import { Pixel } from '../Pixel';
import { StyledGrid, StyledGridRow } from './Grid.styled';

export const Grid: FC = () => {
	return (
		<StyledGrid>
			{createArr(DEFAULT_Y).map((v, indexY) => (
				<StyledGridRow key={indexY}>
					{createArr(DEFAULT_X).map((v, indexX) => (
						<Pixel key={indexY * DEFAULT_X + indexX} id={indexY * DEFAULT_X + indexX} />
					))}
				</StyledGridRow>
			))}
		</StyledGrid>
	);
};
