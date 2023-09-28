import { FC } from 'react';
import undoSVG from '../../resources/svg/undo.svg';
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
			<img src={undoSVG} alt='undo' width='48px' height='48px' />
		</StyledContainer>
	);
};
