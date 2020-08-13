import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private player: Player = {
    Id: 0,
    isDealer: false
  };
  private lobbyId: number;

  constructor() {
  }

  public get CurrentPlayer(): Player {
    return this.player;
  }

  public get LobbyId(): number {
    return this.lobbyId;
  }

  public get Hand(): Card[] {
    return this.player.Deck;
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

}
