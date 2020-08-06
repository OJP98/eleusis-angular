import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/interfaces/table';
import { Observable, Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {

  private tableObservable$: Observable<Table>;
  private tableSuscription: Subscription;
  private myPlayer: Player;

  public table: Table;
  public lobbyId: string;
  public gameStarted: boolean;

  constructor(
    private gameService: GameService,
    private playerServcie: PlayerService,
    private route: ActivatedRoute,
  ) {
    this.myPlayer = this.playerServcie.CurrentPlayer;
    this.gameStarted = false;
  }

  private GetLobbyId(): string {
    return this.route.snapshot.paramMap.get('lobbyId');
  }

  private AddFakePlayer(): void {
    this.gameService.AddFakePlayer();
    console.log(this.table.Players);
  }

  private ManageTableObservable(): void {
    this.tableObservable$ = this.gameService.getTableSubjet$();
    this.tableSuscription = this.tableObservable$.subscribe(changedTable => this.table = changedTable);
  }


  public StartNewGame(): void {
    this.gameStarted = true;
    console.log(this.table);
  }

  public NextPlayer(): void {
    this.gameService.NextPlayer();
  }

  ngOnInit(): void {
    this.lobbyId = this.GetLobbyId();
    this.ManageTableObservable();
    this.table = this.gameService.GetTable;
  }

  ngOnDestroy(): void {
    this.tableSuscription.unsubscribe();
  }

}
