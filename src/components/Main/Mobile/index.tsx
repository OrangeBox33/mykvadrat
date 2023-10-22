import { FC } from 'react';
import { Grid } from '../../Grid';
import { Palette } from '../../Palette';
import { Undo } from '../../Undo';
import { StyledFlexMobile, StyledMainContainer, StyledPaletteUndo } from './styled';

export const MainMobile: FC = () => {
	return (
		<StyledMainContainer>
			<StyledFlexMobile>
				<Grid deviceType={1} />
				<StyledPaletteUndo>
					<Undo />
					<Palette />
				</StyledPaletteUndo>
			</StyledFlexMobile>
		</StyledMainContainer>
	);
};
