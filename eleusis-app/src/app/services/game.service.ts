import { Injectable } from '@angular/core';
import { Table } from '../interfaces/table';
import { Card } from '../interfaces/card';
import { Player } from '../interfaces/player';
import { Observable, Subject } from 'rxjs';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  /* LOS SIGUIENTES SON VALORES DE TESTING SOLAMENTE */
  currPlayerId = 1;

  private table: Table;
  private tableSubject$ = new Subject<Table>();

  private fullDeck: Card[];
  private playedCards: Card[];
  private players: Player[];

  constructor(
    private playerService: PlayerService,
  ) {
    this.fullDeck = this.GenerateFullDeck();
    this.table = this.CreateTestTable();
    this.playedCards = [];
  }

  public CreateTestTable(): Table {

    const hostPlayer = this.playerService.CurrentPlayer;
    return {
      Deck: this.fullDeck,
      PlayedCards: [],
      Players: [hostPlayer],
      DealerId: hostPlayer.Id,
      HostId: hostPlayer.Id,
      PlayerTurnId: 2,
    }
  }

  public AddFakePlayer(): void {

    this.currPlayerId += 1;

    const fakePlayer: Player = {
      Id: this.currPlayerId,
      Score: 0,
      isDealer: false,
      Name: 'Fake Player',
      Deck: [],
      isConnected: true,
    }

    this.table.Players.push(fakePlayer);
    this.tableSubject$.next(this.table);
  }

  public GenerateFullDeck(): Card[] {

    const cardArray: Card[] = [];
    let symbol: string;
    let value: number;
    let char: string;

    for (let i = 0; i < 4; i++) {

      // Establecer simbolo dependiendo del ciclo
      switch (i) {
        case 0:
          symbol = 'spades';
          break;
        case 1:
          symbol = 'hearts';
          break;
        case 2:
          symbol = 'cubs';
          break;
        case 3:
          symbol = 'diamonds'
      }

      for (let j = 1; j < 14; j++) {

        value = j;

        switch (j) {
          case 1:
            char = 'A';
            break;
          case 11:
            char = 'J';
            break;
          case 12:
            char = 'Q';
            break;
          case 13:
            char = 'K';
            break;
          default:
            char = j.toString();
            break;
        }

        // Crear objeto tipo carta
        const newCard: Card = {
          Char: char,
          Value: value,
          Symbol: symbol
        }

        // Ingresarlo al array de cartas
        cardArray.push(newCard);
      }
    }

    return cardArray;
  }

  public AddNewPlayer(newPlayer: Player) {
    this.players.push(newPlayer);
  }

  public get GetTable() {
    return this.table;
  }

  public getTableSubjet$(): Observable<Table> {
    return this.tableSubject$.asObservable();
  }
}
