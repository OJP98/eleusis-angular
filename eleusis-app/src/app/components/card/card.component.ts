import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Card } from 'src/app/interfaces/card';
import { Observable, Subscription } from 'rxjs';
import { Table } from 'src/app/interfaces/table';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  public playedCards: Card[];

  constructor(
    private gameService: GameService,
  ) {
    this.playedCards = this.gameService.PlayedCards;
  }

  public AddCard(): void {
    this.gameService.AddCard();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

}
