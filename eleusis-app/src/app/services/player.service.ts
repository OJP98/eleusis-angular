import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playerId: number;
  private score: number;
  private isDealer: boolean;
  private isHost: boolean;
  private isConnected: boolean;
	private player: Player;
	private lobbyId: number;

  public name: string;
  public deck: Card[];

  constructor() {
    this.player = this.CreateFakePlayer();
  }

  public SetAsHost(hostValue: boolean) {
    this.isHost = hostValue;
  }

  private CreateFakePlayer(): Player {
    return {
      Id: 1,
      Score: 0,
      isDealer: true,
      Name: 'Dealer Player',
      Deck: [],
      isConnected: true
    }
  }

  public get CurrentPlayer(): Player {
    return this.player;
	}

	public SetNewLobbyData(newlobbyId: number, newPlayerId: number, playerName: string) {
		this.lobbyId = newlobbyId;
		this.playerId = newPlayerId;
		this.player.Id = newPlayerId;
		this.player.Name = playerName;
	}

	public get LobbyId(): number {
		return this.lobbyId;
	}
}
