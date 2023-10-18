import { FC } from 'react';
import undoPNG from '../../resources/png/undo.png';
import { StyledContainer } from './Undo.styled';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectEmptyHistory, undo } from '../../redux/slice';

export const Undo: FC = () => {
	const dispatch = useAppDispatch();
	const emptyHistory = useAppSelector(selectEmptyHistory);

	const handleClick = () => {
		dispatch(undo());
	};

	return (
		<StyledContainer onClick={handleClick} disabled={emptyHistory}>
			<img src={undoPNG} alt='undo' width='26px' height='26px' />
		</StyledContainer>
	);
};
