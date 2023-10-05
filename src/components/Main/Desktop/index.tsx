import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import { StyledGrid, StyledMainContainer, StyledPalette, StyledPaletteUndoDesktop, StyledUndo } from './styled';
import { Undo } from '../../Undo';
import { useAppDispatch } from '../../../redux/hooks';
import { test1 } from '../../../redux/slice';

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
					<button onClick={() => dispatch(test1())}>123</button>
					<StyledPalette>
						<Palette />
					</StyledPalette>
				</StyledPaletteUndoDesktop>
			</div>
		</StyledMainContainer>
	);
};
