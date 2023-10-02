import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import { StyledGrid, StyledMainContainer, StyledPalette, StyledPaletteUndoDesktop, StyledUndo } from './styled';
import { Undo } from '../../Undo';

export const MainDesktop: FC = () => {
	return (
		<StyledMainContainer>
			<div>
				<StyledGrid>
					<Grid />
				</StyledGrid>
				<StyledPaletteUndoDesktop>
					<StyledUndo>
						<Undo />
					</StyledUndo>
					<StyledPalette>
						<Palette />
					</StyledPalette>
				</StyledPaletteUndoDesktop>
			</div>
		</StyledMainContainer>
	);
};
