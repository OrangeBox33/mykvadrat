import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import { StyledGrid, StyledMainContainer, StyledPalette, StyledPaletteUndoDesktop, StyledUndo } from './styled';
import { Undo } from '../../Undo';
import { Play } from '../../Play';

export const MainDesktop: FC = () => {
	return (
		<StyledMainContainer>
			<div>
				<StyledGrid>
					<Grid deviceType={0} />
				</StyledGrid>
				<StyledPaletteUndoDesktop>
					<StyledUndo>
						<Undo />
					</StyledUndo>

					<StyledUndo>
						<Play />
					</StyledUndo>

					<StyledPalette>
						<Palette />
					</StyledPalette>
				</StyledPaletteUndoDesktop>
			</div>
		</StyledMainContainer>
	);
};
