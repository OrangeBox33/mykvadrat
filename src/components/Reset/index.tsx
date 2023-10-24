import { FC } from 'react';
import { StyledContainer } from './Reset.styled';
import { useAppDispatch } from '../../redux/hooks';
import { resetServerHistory } from '../../redux/slice';

export const Reset: FC = () => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(resetServerHistory());
	};

	return <StyledContainer onClick={handleClick}>ResetHistory</StyledContainer>;
};
