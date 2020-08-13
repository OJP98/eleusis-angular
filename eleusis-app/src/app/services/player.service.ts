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

  public SetNewLobbyData(newlobbyId: number, socketResponse: any, isDealer: boolean, name: string,) {
    this.lobbyId = newlobbyId;
    this.player.Id = socketResponse.myId;
    this.player.Name = name;
    this.player.isDealer = isDealer;
    this.player.Deck = [];
    this.player.Score = 0;
    this.player.isConnected = true;
    /*
        const card1: Card = {
          Char: 'K',
          Symbol: 'cubs',
          Value: 13,
        }
        const card2: Card = {
          Char: 'A',
          Symbol: 'spades',
          Value: 1,
        }
        const card3: Card = {
          Char: '2',
          Symbol: 'hearts',
          Value: 2,
        }
        const card4: Card = {
          Char: '3',
          Symbol: 'diamonds',
          Value: 3,
        }

        this.player.Deck.push(card1, card2, card3, card4);
         */
  }

  public get LobbyId(): number {
    return this.lobbyId;
  }

  public get Hand(): Card[] {
    return this.player.Deck;
  }
}
