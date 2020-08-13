import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Card } from 'src/app/interfaces/card';
import { Player } from 'src/app/interfaces/player';
import { GameService } from 'src/app/services/game.service';
import { Table } from 'src/app/interfaces/table';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})
export class PlayerHandComponent implements OnInit {

  public player: Player;
  public table: Table;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {
    this.player = this.playerService.CurrentPlayer;
    this.table = this.gameService.GetTable;
  }

  public GuessRule(): void {
    console.log('GUESS THE RULE');
  }

  public ClaimNoCardsRemaining(): void {
    console.log('I GOT NO CARDS');
  }

  public PlayCard(card: Card): void {
    console.log(card);
    this.gameService.PlayCard(card.symbol, card.value);
  }

  ngOnInit(): void {
  }

}
