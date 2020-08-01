import { Card } from './card';
import { Player } from './player';

export interface Table {
	Deck: Card[],
	PlayedCards: Card[],
	Players: Player[],
	Dealer: Player,
	PlayerTurnId: number,
	Rounds?: number,
}
