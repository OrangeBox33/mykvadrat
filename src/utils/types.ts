export type Id = number;

export type Grid = Record<Id, string>;

export interface PlayHistoryData {
	oldGrid: Grid;
	history: History;
}

export interface Pixel {
	id: number;
	color: string;
}

export type History = Pixel[];
