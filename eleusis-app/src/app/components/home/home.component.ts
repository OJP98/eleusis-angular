import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from '../../interfaces/table';
import { ClientService } from '../../services/client.service';
import { Observable, Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

	private newResponseObservable: Observable<any>;
	private newResponseSubscription: Subscription;
	private newRoomRequested = false;

	// Formularios
	public codeControl: FormControl = new FormControl('', [
		Validators.required,
		Validators.minLength(4),
	]);
	public nameControl: FormControl = new FormControl('', [
		Validators.required,
		Validators.minLength(4),
	]);
	public formGroup: FormGroup = new FormGroup({
		codeControl: this.codeControl,
		nameControl: this.nameControl,
	});

	constructor (
		private _router: Router,
		private clientService: ClientService,
		private gameService: GameService,
		private playerService: PlayerService,
	) {
		this.clientService.Listen();
	}

	private SubscribeToResponse(): void {
		this.newResponseObservable = this.clientService.NewResponseSubject;
		this.newResponseSubscription = this.newResponseObservable.subscribe(newResponse => {

			// Unirse/crear una sala
			if (newResponse.option === 1) {
				this.gameService.CreateNewTable(this.newRoomRequested, newResponse);
				this.playerService.SetLobbyId(newResponse.sala);
				this.JoinRoom(newResponse.sala);
			}

		})
	}

	private JoinRoom(roomCode: number): void {
		this._router.navigate([roomCode]).catch(error => {
			console.error('Error trying to create a new room:', error);
		}).finally(() => {
			// TODO: Desactivar spinner
		})
	}

	public RequestNewRoom(): void {
		// TODO: Activar spinner
		this.newRoomRequested = true;
		this.clientService.Conectar(undefined, this.nameControl.value);

	}

	public RequestToJoinRoom(): void {
		this.newRoomRequested = false;
		this.clientService.Conectar(this.codeControl.value, this.nameControl.value);
	}

	ngOnInit(): void {
		this.SubscribeToResponse();
	}

	ngOnDestroy(): void {
		this.newResponseSubscription.unsubscribe();
	}
}
