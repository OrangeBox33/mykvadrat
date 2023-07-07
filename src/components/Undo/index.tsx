import { FC } from 'react';
import undoSVG from '../../resources/svg/undo.svg';
import { StyledContainer } from './Undo.styled';
import { useAppDispatch } from '../../redux/hooks';
import { popHistory } from '../../redux/slice';

export const Undo: FC = () => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(popHistory());
	};

	return (
		<StyledContainer onClick={handleClick}>
			<img src={undoSVG} alt='undo' width='48px' height='48px' />
		</StyledContainer>
	);
};
