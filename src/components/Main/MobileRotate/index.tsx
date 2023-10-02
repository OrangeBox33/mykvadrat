import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import { Undo } from '../../Undo';
import { StyledMainContainer, StyledGrid, StyledPalette, StyledUndo, StyledPaletteUndo } from './styled';

export const MainMobileRotate: FC = () => {
	return (
		<StyledMainContainer>
			<StyledPaletteUndo>
				<StyledUndo>
					<Undo />
				</StyledUndo>
				<StyledPalette>
					<Palette />
				</StyledPalette>
			</StyledPaletteUndo>
			<StyledGrid>
				<Grid />
			</StyledGrid>
		</StyledMainContainer>
	);
};
