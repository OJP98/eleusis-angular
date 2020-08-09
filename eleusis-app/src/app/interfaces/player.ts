import { Card } from './card';

export interface Player {
	Id: number;
	isDealer: boolean;
	Score?: number;
	Name?: string;
	Deck?: Card[];
	isConnected?: boolean;
}
