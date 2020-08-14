import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Card } from 'src/app/interfaces/card';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  public playedCards: Card[];
  @ViewChild('scroll', { static: true }) scroll: any;

  constructor(
    private gameService: GameService,
  ) {
    this.playedCards = this.gameService.PlayedCards;
  }

  public AddCard(): void {
    this.gameService.AddCard();
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
