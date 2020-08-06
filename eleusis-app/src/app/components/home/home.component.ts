import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from '../../interfaces/table';
import { ClientService } from '../../services/client.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public playerName: string;
	public lobbyCode: number;

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

	constructor(private _router: Router, private _clientService: ClientService) {
		this._clientService.Listen();
	}

	public CreateNewRoom(): void {
		// TODO: Obtener sala(s) disponibles
		this._clientService.Conectar(undefined, this.playerName);
		const lobbyId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
		this._router.navigate([lobbyId]);
	}

	ngOnInit(): void {}
}
