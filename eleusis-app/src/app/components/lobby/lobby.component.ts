import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/interfaces/table';
import { Observable, Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {

  private tableObservable$: Observable<Table>;
  private tableSuscription: Subscription;
  private gameReady = false;
  private myPlayer: Player;

  public table: Table;
  public lobbyId: string;
  public gameStarted: boolean;
  public numericRulesArray: string[];
  public colorRulesArray: string[];

  public selectedRulesForm: FormGroup;
  // Reglas numéricas
  public enableNumericRule: FormControl = new FormControl('');
  public numericRuleControl: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  public numericRuleValue: FormControl = new FormControl({ value: '', disabled: true }, [
    Validators.max(13),
    Validators.min(1),
    Validators.required,
  ]);
  // Reglas color
  public enableColorRule: FormControl = new FormControl('');
  public colorRuleControl: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  public colorRuleValue: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);

  constructor(
    private gameService: GameService,
    private playerServcie: PlayerService,
    private route: ActivatedRoute,
  ) {
    this.myPlayer = this.playerServcie.CurrentPlayer;
    this.numericRulesArray = this.gameService.NumericRules;
    this.colorRulesArray = this.gameService.ColorRules;
    this.gameStarted = false;

    this.selectedRulesForm = new FormGroup({
      numericRule: this.numericRuleControl,
      numericRuleValue: this.numericRuleValue,
      enableNumericRule: this.enableNumericRule,

      colorRule: this.colorRuleControl,
      colorRuleValue: this.colorRuleValue,
      enableColorRule: this.enableColorRule,
    });

    console.log(this.myPlayer);
    this.gameService.SubscribeToSocketResponse();
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

  public ToggleNumericRules(): void {
    if (this.enableNumericRule.value) {
      this.numericRuleControl.enable();
      this.numericRuleValue.enable();

      // DESACTIVAR LOS OTROS CAMPOS
      this.enableColorRule.setValue(false);
      this.colorRuleControl.disable();
      this.colorRuleValue.disable();
    } else {
      this.numericRuleControl.disable();
      this.numericRuleValue.disable();
    }

    this.selectedRulesForm.updateValueAndValidity();
  }

  public ToggleColorRules(): void {
    if (this.enableColorRule.value) {
      this.colorRuleControl.enable();
      this.colorRuleValue.enable();

      // DESACTIVAR LOS OTROS CAMPOS
      this.enableNumericRule.setValue(false);
      this.numericRuleControl.disable();
      this.numericRuleValue.disable();
    } else {
      this.colorRuleControl.disable();
      this.colorRuleValue.disable();
    }

    this.selectedRulesForm.updateValueAndValidity();
  }

  public SetRule(): void {
    const rule: any = [];

    if (this.enableNumericRule.value) {
      rule.push(0);
      rule.push(this.numericRuleControl.value);
      rule.push(this.numericRuleValue.value);
    } else {
      rule.push(1);
      rule.push(this.colorRuleControl.value);
      rule.push(this.colorRuleValue.value);
    }

    // Se llama al servicio para mandarle la regla al servidor
    this.gameService.SetMatchRule(rule);
    this.gameReady = true;
    this.selectedRulesForm.disable();
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
