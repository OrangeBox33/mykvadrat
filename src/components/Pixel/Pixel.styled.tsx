import styled from 'styled-components';

export const StyledPixel = styled.div<{ color: string }>`
	height: 20px;
	width: 20px;
	background-color: ${({ color }) => color};
`;
