import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import { StyledGrid, StyledMainContainer, StyledPalette, StyledPaletteUndoDesktop, StyledUndo } from './styled';
import { Undo } from '../../Undo';
import { useAppDispatch } from '../../../redux/hooks';
import { Play } from '../../Play';

export const MainDesktop: FC = () => {
	const dispatch = useAppDispatch();
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
