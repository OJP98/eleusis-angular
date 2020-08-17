import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from '../../interfaces/table';
import { ClientService } from '../../services/client.service';
import { Observable, Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';

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

	public connected = false;

	constructor(
		private _router: Router,
		private clientService: ClientService,
		private gameService: GameService,
		private playerService: PlayerService,
		public dialog: MatDialog
	) { }

	public ConnectToServer(url: string): void {
		this.clientService.SetServer(url);
		this.clientService.Listen();
		this.SubscribeToResponse();
		this.connected = true;
	}

	/**
	 * Subscribes and handles to socket responses.
	 */
	private SubscribeToResponse(): void {
		this.newResponseObservable = this.clientService.NewResponseSubject;
		this.newResponseSubscription = this.newResponseObservable.subscribe(
			(newResponse) => {
				// El socket dio algun error
				if (newResponse.option === 0) {
					// Mostrar dialogo con el respectivo error
					this.ShowErrorDialog({
						title: 'SERVER ERROR',
						content: newResponse.mensaje,
					});

					// Unirse, crear una nueva sala
				} else if (newResponse.option === 1) {
					this.playerService.SetNewLobbyData(
						newResponse.sala,
						newResponse,
						this.newRoomRequested,
						this.nameControl.value
					);
					this.gameService.CreateNewTable(this.newRoomRequested, newResponse);
					this.JoinRoom(newResponse.sala);
				}
			},
			(error) => {
				const dialogRef = this.dialog.open(DialogComponent, {
					data: {
						content: `Error while trying to connect to the server: ${error} We're gonna refresh the page.`,
						title: 'CONNECTION ERROR',
					},
				});

				dialogRef.afterClosed().subscribe(() => {
					window.location.reload();
				});
			}
		);
	}

	/**
	 * Uses router to navigate to a new lobby.
	 * @param roomCode code of the room/lobby
	 */
	private JoinRoom(roomCode: number): void {
		this._router.navigate([roomCode]).catch((error) => {
			console.error('Error trying to create a new room:', error);
		});
	}

	/**
	 * Opens dialog componente with injected data
	 * @param dialogData Data to display in the dialog
	 */
	private ShowErrorDialog(dialogData: any): void {
		this.dialog.open(DialogComponent, {
			data: {
				content: dialogData.content,
				title: dialogData.title,
			},
		});
	}

	public ShowInstructions(): void {
		const title = 'How to play';
		const content = 'ShowInstructions';

		this.dialog.open(DialogComponent, {
			data: {
				content,
				title,
			},
		});
	}

	/**
	 * Requests socket service for a new room
	 */
	public RequestNewRoom(): void {
		// TODO: Activar spinner
		this.newRoomRequested = true;
		this.clientService.Conectar(undefined, this.nameControl.value);
	}

	/**
	 * Requests socket for data to an existing room
	 */
	public RequestToJoinRoom(): void {
		this.newRoomRequested = false;
		this.clientService.Conectar(this.codeControl.value, this.nameControl.value);
	}

	ngOnInit(): void { }

	ngOnDestroy(): void {
		this.newResponseSubscription.unsubscribe();
	}
}
