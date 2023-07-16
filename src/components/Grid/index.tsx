import { FC } from 'react';
import { createArr } from '../../utils/utils';
import { DEFAULT_X, DEFAULT_Y } from '../../utils/constants';
import { Pixel } from '../Pixel';
import { StyledGrid } from './Grid.styled';

export const Grid: FC = () => {
	return (
		<StyledGrid>
			{createArr(DEFAULT_X * DEFAULT_Y).map((v, index) => (
				<Pixel key={index} id={index} />
			))}
		</StyledGrid>
	);
};
