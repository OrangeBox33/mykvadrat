import { FC, useEffect, useState } from 'react';
import { Grid } from '../Grid';
import { Palette } from '../Palette';
import { StyledCenteredContainer, StyledGrid, StyledMainContainer, StyledPalette, StyledUndo } from './Main.styled';
import { Undo } from '../Undo';
import { socket } from '../../socket';

export const Main: FC = () => {
	const [render, setRender] = useState(0);
	useEffect(() => {
		if (render < 30) {
			if (socket.readyState === 1) {
				socket.send(JSON.stringify({ type: 'getGrid' }));
			} else {
				setTimeout(() => {
					setRender(prevRender => prevRender + 1);
				}, 100);
			}
		}
	}, [render]);

	return (
		<StyledMainContainer>
			<StyledCenteredContainer>
				<div>
					<StyledGrid>
						<Grid />
					</StyledGrid>
					<StyledPalette>
						<Palette />
					</StyledPalette>
					<StyledUndo>
						<Undo />
					</StyledUndo>
				</div>
			</StyledCenteredContainer>
		</StyledMainContainer>
	);
};
