import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import { StyledGrid, StyledMainContainer, StyledPalette, StyledPaletteUndoDesktop } from './styled';
import { Undo } from '../../Undo';
import { BrushType } from '../../BrushType';
import { Chat } from '../../Chat/Desktop';

export const MainDesktop: FC = () => {
	return (
		<StyledMainContainer>
			<div>
				<StyledGrid>
					<Grid deviceType={0} />
					<Chat />
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
