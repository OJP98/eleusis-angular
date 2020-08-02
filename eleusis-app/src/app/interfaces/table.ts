import { Card } from './card';
import { Player } from './player';

export interface Table {
	Deck: Card[],
	PlayedCards: Card[],
	Players: Player[],
	DealerId: number,
	PlayerTurnId: number,
	HostId: number,
	Rounds?: number,
}
