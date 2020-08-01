import { Card } from './card';

export interface Player {
	Id: number,
	Score: number,
	isDealer: boolean,
	Name?: string,
	Deck?: Card[],
	isConnected?: boolean,
}
