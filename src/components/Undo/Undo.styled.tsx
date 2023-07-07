import styled from 'styled-components';

export const StyledContainer = styled.button`
	border: none;
	outline: none;
	display: flex;
	height: 60px;
	width: 60px;
	background-color: #313134;
	border: 2px solid #1c1c1c;
	&:hover {
		cursor: pointer;
	}
	&:active {
		transform: scale(0.95);
	}
`;
