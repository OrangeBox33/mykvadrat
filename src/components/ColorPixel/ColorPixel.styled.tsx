import styled from 'styled-components';

export const StyledColorPixel = styled.div<{ color: string; isActive: boolean }>`
	height: 30px;
	width: 20px;
	background-color: ${({ color }) => color};
`;
