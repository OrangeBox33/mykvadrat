import { FC, useState } from 'react';
import { Grid } from '../Grid';
import { Palette } from '../Palette';

export const Main: FC = () => {
	return (
		<>
			<Grid />
			<Palette />
		</>
	);
};
