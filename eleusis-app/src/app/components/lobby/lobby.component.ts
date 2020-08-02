import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/interfaces/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  private tableObservable$: Observable<Table>;

  public table: Table;
  public lobbyId: string;
  public gameStarted: boolean;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
  ) {
    this.gameStarted = false;
  }

  private GetLobbyId(): string {
    return this.route.snapshot.paramMap.get('lobbyId');
  }

  private AddFakePlayer(): void {
    this.gameService.AddFakePlayer();
    console.log(this.table.Players);
  }

  public StartNewGame(): void {
    this.gameStarted = true;
    console.log(this.table);
  }

  private ManageTableObservable(): void {
    this.tableObservable$ = this.gameService.getTableSubjet$();
    this.tableObservable$.subscribe(changedTable => this.table = changedTable);
  }

  ngOnInit(): void {
    this.lobbyId = this.GetLobbyId();
    this.ManageTableObservable();
    this.table = this.gameService.GetTable;
  }

}
