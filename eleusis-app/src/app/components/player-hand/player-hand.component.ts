import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Card } from 'src/app/interfaces/card';
import { Player } from 'src/app/interfaces/player';
import { GameService } from 'src/app/services/game.service';
import { Table } from 'src/app/interfaces/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    private gameService: GameService,
    public dialog: MatDialog,
  ) {
    this.player = this.playerService.CurrentPlayer;
    this.table = this.gameService.GetTable;
  }

  public GuessRule(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: 'GuessRule',
        title: 'GUESS THE RULE',
      }
    });

    dialogRef.afterClosed().subscribe(rule => {
      if (rule) {
        this.gameService.SendGuessedRule(rule);
      }

    })
  }

  public ClaimNoCardsRemaining(): void {
    this.gameService.ClaimNoCardsRemaining(this.player.Deck);
  }

  public PlayCard(card: Card): void {
    this.gameService.PlayCard(card);
  }

  ngOnInit(): void {
  }

}
