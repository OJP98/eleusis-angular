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

  private table: Table | null;
  private tableSubject$ = new Subject<Table>();

  private numericRules: string[];
  private colorRules: string[];
  private symbolRules: string[];

  private fullDeck: Card[];
  private playedCards: Card[];
  private players: Player[];

  constructor(
    private playerService: PlayerService,
  ) {
    this.fullDeck = this.GenerateFullDeck();
    this.setRules();
    this.playedCards = [];
  }

  private setRules(): void {
    this.numericRules = [
      `be a multiple of`,
      `be greater than`,
      `be less than`,
      `contain the number`,
    ];

    this.colorRules = [
      `can't have the color`,
      // `should follow the order`
    ]
  }

  public CreateNewTable(isNew: boolean, newTable: any): Table {

    if (isNew) {
      const hostPlayer = this.playerService.CurrentPlayer;
      this.players = [hostPlayer];
      this.table = {
        Deck: this.fullDeck,
        PlayedCards: [],
        Players: [hostPlayer],
        DealerId: hostPlayer.Id,
        HostId: hostPlayer.Id,
        PlayerTurnId: 2,
      }
    } else {
      this.table = {
        Deck: this.fullDeck,
        PlayedCards: [],
        Players: newTable.Players,
        DealerId: newTable.DealerId,
        HostId: newTable.HostId,
        PlayerTurnId: newTable.PlayerTurnId,
      }
    }

    return this.GetTable;

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
    this.players.push(fakePlayer);
    // this.tableSubject$.next(this.table);
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

  public get PlayerMoving(): Player {
    return this.players.find(player => player.Id === this.table.PlayerTurnId);
  }

  public NextPlayer(): void {
    const currentPlayer: Player = this.PlayerMoving;

    for (let i = 0; i < this.players.length; i++) {
      const selected = this.players[i];

      if (selected === currentPlayer && !selected.isDealer) {

        if (i !== this.players.length - 1) {
          this.table.PlayerTurnId = this.players[i + 1].Id;

        } else if (!this.players[0].isDealer) {
          this.table.PlayerTurnId = this.players[0].Id;

        } else {
          this.table.PlayerTurnId = this.players[1].Id;
        }
      }
    }
  }

  public get GetTable() {
    return this.table;
  }

  public get NumericRules(): string[] {
    return this.numericRules;
  }

  public get ColorRules(): string[] {
    return this.colorRules;
  }

  public get SymbolRules(): string[] {
    return this.symbolRules;
  }

  public getTableSubjet$(): Observable<Table> {
    return this.tableSubject$.asObservable();
  }
}
