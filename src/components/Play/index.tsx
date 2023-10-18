import { FC } from 'react';
import playPNG from '../../resources/png/play.png';
import { StyledContainer } from './Play.styled';
import { useAppDispatch } from '../../redux/hooks';
import { test1 } from '../../redux/slice';

export const Play: FC = () => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(test1());
	};

	return (
		<StyledContainer onClick={handleClick}>
			<img src={playPNG} alt='undo' width='26px' height='26px' />
		</StyledContainer>
	);
};
