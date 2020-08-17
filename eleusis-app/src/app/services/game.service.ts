import { Injectable } from '@angular/core';
import { Table } from '../interfaces/table';
import { Card } from '../interfaces/card';
import { Player } from '../interfaces/player';
import { Observable, Subject, Subscription } from 'rxjs';
import { ClientService } from './client.service';
import { PlayerService } from './player.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private newResponseObservable: Observable<any>;
  private newResponseSubscription: Subscription;

  /* LOS SIGUIENTES SON VALORES DE TESTING SOLAMENTE */
  currPlayerId = 1;

  private table: Table | null;
  private tableSubject$ = new Subject<Table>();

  private numericRules: string[] = [
    `be a multiple of`,
    `be greater than`,
    `be less than`,
    `contain the number`,
  ];
  private colorRules: string[] = [
    `can't have the symbol`,
    // `should follow the order`
  ]
  private symbolRules: string[];

  private players: Player[];
  private fullDeck: Card[];
  private tableId: number;
  private currentPlayer: Player;

  constructor(
    private clientService: ClientService,
    private playerService: PlayerService,
    public dialog: MatDialog,
  ) { }

  public CreateNewTable(isNew: boolean, newTable: any): Table {

    this.fullDeck = this.GenerateFullDeck();
    this.tableId = newTable.sala;
    this.currentPlayer = this.playerService.CurrentPlayer;

    if (isNew) {
      this.players = [this.currentPlayer];
      this.table = {
        Deck: this.fullDeck,
        PlayedCards: [],
        Players: [this.currentPlayer],
        DealerId: this.currentPlayer.Id,
        HostId: this.currentPlayer.Id,
        PlayerTurnId: 2,
        TableId: this.tableId,
        MatchStarted: false,
      }
    } else {
      this.table = {
        Deck: this.fullDeck,
        PlayedCards: [],
        Players: newTable.Players,
        DealerId: newTable.DealerId,
        HostId: newTable.HostId,
        PlayerTurnId: newTable.PlayerTurnId,
        TableId: this.tableId,
        MatchStarted: false,
      }
    }

    return this.GetTable;

  }

  public SetMatchRule(rule: any) {
    this.table.Rule = rule;
    this.clientService.DefinirRegla(this.table.TableId, this.table.Rule);
  }

  public SendMatchReady(): void {
    this.clientService.ComenzarJuego(this.table.TableId);
    this.table.MatchStarted = true;
  }

  public PlayCard(card: Card): void {
    this.clientService.JugarCarta(card, this.tableId);

    const index = this.currentPlayer.Deck.indexOf(card);
    if (index !== -1) {
      this.currentPlayer.Deck.splice(index, 1);
    }
  }

  public ClaimNoCardsRemaining(cards: Card[]): void {
    this.clientService.NoJugada(this.tableId, cards);
  }

  public SendGuessedRule(rule: any): void {
    this.clientService.AdivinarRegla(rule, this.tableId);
  }

  public PrepareNewRound(newDealerId: number, updatedPlayers: Player[], playerTurnId: number): void {

    // Actualizar el jugador
    if (this.currentPlayer.Id === newDealerId) {
      this.currentPlayer.isDealer = true;
    } else {
      this.currentPlayer.isDealer = false;
    }

    // Actualizar el estado de jugadores en la mesa
    this.table.Players.forEach(player => {
      if (player.Id === newDealerId) {
        player.isDealer = true;
      } else {
        player.isDealer = false;
      }
    });

    this.table.DealerId = newDealerId;
    this.table.PlayerTurnId = playerTurnId;
    this.table.PlayedCards = [];
    this.table.MatchStarted = false;


  }

  public DeclareWinner(winner: boolean): void {

    let dialogTitle: string;
    let dialogContent: string;

    if (winner) {
      dialogTitle = 'WINNER WINNER CHICKEN DINNER';
      dialogContent = `You won with a total score of: ${this.currentPlayer.Score}`;

    } else {
      dialogTitle = 'YOU LOST :(';
      dialogContent = `Your final score: ${this.currentPlayer.Score}`;
    }

    // Actualizar el estado de jugadores en la mesa
    this.table.Players.forEach(player => {
      player.isDealer = false;
    });

    const max: Player = this.table.Players.reduce((prev, current) => (prev.Score > current.Score) ? prev : current);
    this.table.WinnerName = max.Name;
    this.table.MatchStarted = false;
    this.table.DealerId = -1;

  }

  public get PlayerMoving(): Player {
    return this.players.find(player => player.Id === this.table.PlayerTurnId);
  }

  public get GetTable(): Table {
    return this.table;
  }

  public get PlayedCards(): Card[] {
    return this.table.PlayedCards;
  }

  public get PlayerTurnId(): number {
    return this.table.PlayerTurnId;
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

  private OpenDialog(title: string, content: string) {
    this.dialog.open(DialogComponent, {
      data: {
        content,
        title
      }
    });

  }

  public SubscribeToSocketResponse(): void {
    this.newResponseObservable = this.clientService.NewResponseSubject;
    this.newResponseSubscription = this.newResponseObservable.subscribe(newResponse => {

      // Actualizar el objeto tipo tabla
      if (newResponse.option === 1 && newResponse.Players) {
        console.log(newResponse);

        this.table.Players = newResponse.Players;

        // El juego ha comenzado. Asignar cartas a jugadores.
      } else if (newResponse.option === 4) {
        this.table.MatchStarted = true;
        this.currentPlayer.Deck = newResponse.cartas[0];

        // El jugador juega una carta
      } else if (newResponse.option === 5) {

        let dialogTitle: string;
        let dialogContent: string;

        if (!newResponse.valido) {

          // Crear objeto tipo carta
          const newCard: Card = {
            character: newResponse.carta.character,
            value: newResponse.carta.value,
            symbol: newResponse.carta.symbol
          }
          // Push a la mano del jugador
          this.currentPlayer.Deck.push(newCard);

          dialogTitle = 'Whoops...';
          dialogContent = `
          The card you played doesn't follow the rules. You received: ${newCard.character} of ${newCard.symbol}.`;

        } else {
          dialogTitle = 'Nice!';
          dialogContent = `
          You played a card that follows the rules.`;
        }

        this.OpenDialog(dialogTitle, dialogContent);

        // Jugadores reciben una carta jugada
      } else if (newResponse.option === 6) {

        if (newResponse.carta) {

          const playedCard: Card = {
            symbol: newResponse.carta.symbol,
            value: newResponse.carta.value,
            character: newResponse.carta.character,
            isValid: newResponse.carta.isValid
          }

          this.table.PlayedCards.push(playedCard);
        }

        this.table.PlayerTurnId = newResponse.turno;

      } else if (newResponse.option === 7) {

        let dialogTitle: string;
        let dialogContent: string;

        // Sus cartas no cumplían con la regla
        if (newResponse.valido) {
          dialogTitle = 'Great call!';
          dialogContent = `None of the cards you had followed the rules. You received a new hand.`;
          this.currentPlayer.Deck = newResponse.carta;

          // Una o más cartas cumplen con la regla. Jugador recibe nuevas cartas.
        } else {

          const newCard: Card = {
            character: newResponse.carta.character,
            value: newResponse.carta.value,
            symbol: newResponse.carta.symbol
          }
          dialogTitle = 'Nope';
          dialogContent = `You still have one or more cards that follow the rules. You received:
          ${newCard.character} of ${newCard.symbol}.`;
          this.currentPlayer.Deck.push(newCard);
        }

        this.OpenDialog(dialogTitle, dialogContent);
      } else if (newResponse.option === 8) {

        let dialogTitle: string;
        let dialogContent: string;

        if (newResponse.valido) {
          dialogTitle = 'CONGRATS!';
          dialogContent = 'You correctly guessed the rule.'
        } else {
          dialogTitle = 'Incorrect';
          dialogContent = `You didn't guessed the rule correctly. Try again, if you dare.`
        }

        this.OpenDialog(dialogTitle, dialogContent);

      } else if (newResponse.option === 9) {

        this.currentPlayer.Score += newResponse.puntos;

        if (newResponse.Dios < 0) {
          this.DeclareWinner(newResponse.ganador);

        } else {

          let dialogTitle: string;
          let dialogContent: string;

          if (newResponse.ganador && !this.currentPlayer.isDealer) {
            dialogTitle = 'YOU WON THIS ROUND!';
          } else {
            dialogTitle = 'ROUND OVER';
          }

          dialogContent = `Your current score is: ${newResponse.puntos}`

          this.OpenDialog(dialogTitle, dialogContent);
          this.PrepareNewRound(newResponse.Dios, newResponse.Players, newResponse.turno);
        }


      }
    });
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
          symbol = 'clubs';
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
          character: char,
          value,
          symbol
        }

        // Ingresarlo al array de cartas
        cardArray.push(newCard);
      }
    }

    return cardArray;
  }
}
