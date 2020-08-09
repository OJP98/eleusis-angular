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
  private isConnected: boolean;
  private player: Player = {
    Id: 0,
    isDealer: false
  };
  private lobbyId: number;

  public name: string;
  public deck: Card[];

  constructor() {
  }

  public get CurrentPlayer(): Player {
    return this.player;
  }

  public SetNewLobbyData(newlobbyId: number, socketResponse: any, isDealer: boolean, name: string,) {
    this.lobbyId = newlobbyId;
    this.player.Id = socketResponse.myId;
    this.player.Name = name;
    this.player.isDealer = isDealer;
    this.player.Deck = [];
    this.player.Score = 0;
    this.player.isConnected = true;
  }

  public get LobbyId(): number {
    return this.lobbyId;
  }
}
