import styled from 'styled-components';

export const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(16, 1fr);
	grid-template-rows: repeat(16, 1fr);
	grid-column-gap: 1px;
	grid-row-gap: 1px;
`;

export const StyledGridRow = styled.div`
	display: flex;
	gap: 1px;
`;
