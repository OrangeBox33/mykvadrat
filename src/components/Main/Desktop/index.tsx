import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import {
	StyledGrid,
	StyledMainContainer,
	StyledPalette,
	StyledPaletteUndoDesktop,
	StyledUndo,
} from './styled';
import { Undo } from '../../Undo';
import { Play } from '../../Play';
import { BrushType } from '../../BrushType';

export const MainDesktop: FC = () => {
	return (
		<StyledMainContainer>
			<div>
				<StyledUndo>
					<Play />
				</StyledUndo>
				<StyledGrid>
					<Grid deviceType={0} />
				</StyledGrid>
				<StyledPaletteUndoDesktop>
					<Undo />

					<BrushType />

					<StyledPalette>
						<Palette />
					</StyledPalette>
				</StyledPaletteUndoDesktop>
			</div>
		</StyledMainContainer>
	);
};
