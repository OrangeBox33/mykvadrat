import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import { Undo } from '../../Undo';
import { StyledFlexMobile, StyledMainContainer, StyledPaletteUndo } from './styled';
import { BrushType } from '../../BrushType';

export const MainMobile: FC = () => {
	return (
		<StyledMainContainer>
			<StyledFlexMobile>
				<Grid deviceType={1} />
				<StyledPaletteUndo>
					<Undo />
					<BrushType />
					<Palette />
				</StyledPaletteUndo>
			</StyledFlexMobile>
		</StyledMainContainer>
	);
};
