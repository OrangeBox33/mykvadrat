import styled from 'styled-components';

export const StyledPalettePixel = styled.div<{ color: string; isActive: boolean }>`
	box-sizing: border-box;
	height: 30px;
	width: 20px;
	background-color: ${({ color }) => color};
	border: ${({ isActive }) => (isActive ? '4px solid white' : 'none')};
`;
