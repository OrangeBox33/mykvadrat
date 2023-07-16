export type Id = number;

export type Grid = Record<Id, string>;

export interface Pixel {
	id: number;
	color: string;
}

export type History = Pixel[];
