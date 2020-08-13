import { Card } from './card';
import { Player } from './player';

export interface Table {
	Deck: Card[];
	PlayedCards: Card[];
	Players: Player[];
	DealerId: number;
	HostId: number;
	PlayerTurnId?: number;
	Rounds?: number;
	Rule?: any;
	TableId?: number;
	MatchStarted?: boolean;
}
