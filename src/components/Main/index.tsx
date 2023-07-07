import { FC, useState } from 'react';
import { Grid } from '../Grid';
import { Palette } from '../Palette';
import { StyledCenteredContainer, StyledGrid, StyledMainContainer, StyledPalette, StyledUndo } from './Main.styled';
import { Undo } from '../Undo';

export const Main: FC = () => {
	return (
		<StyledMainContainer>
			<StyledCenteredContainer>
				<div>
					<StyledGrid>
						<Grid />
					</StyledGrid>
					<StyledPalette>
						<Palette />
					</StyledPalette>
					<StyledUndo>
						<Undo />
					</StyledUndo>
				</div>
			</StyledCenteredContainer>
		</StyledMainContainer>
	);
};
