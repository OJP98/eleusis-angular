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

  private tableObservable$: Observable<Table>;
  private tableSuscription: Subscription;
  public table: Table;
  public playedCards: Card[];

  constructor(
    private gameService: GameService,
  ) {
    this.table = gameService.GetTable;
  }

  public AddCard(): void {
    this.gameService.AddCard();
    console.log(this.table.PlayedCards);

  }

  ngOnInit(): void {
    this.tableObservable$ = this.gameService.getTableSubjet$();
    this.tableSuscription = this.tableObservable$.subscribe(changedTable => {
      this.table = changedTable;
    });
  }
  ngOnDestroy(): void {
    this.tableSuscription.unsubscribe();
  }

}
