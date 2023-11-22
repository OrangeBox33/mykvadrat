import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import {
	StyledFlex,
	StyledGrid,
	StyledMainContainer,
	StyledPalette,
	StyledPaletteUndoDesktop,
} from './styled';
import { Undo } from '../../Undo';
import { Play } from '../../Play';
import { BrushType } from '../../BrushType';
import { Reset } from '../../Reset';
import { Chat } from '../../Chat';

export const MainDesktop: FC = () => {
	return (
		<StyledMainContainer>
			<div>
				<StyledFlex>
					<Play />
					<Reset />
				</StyledFlex>

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
