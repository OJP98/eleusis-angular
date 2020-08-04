import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
	selector: 'app-client-testing',
	templateUrl: './client-testing.component.html',
	styleUrls: ['./client-testing.component.scss'],
})
export class ClientTestingComponent implements OnInit {
	public isConnected: boolean;
	public clientIp: string;
	public inputDePrueba: string;

	constructor(private _clientServie: ClientService) {
		this._clientServie.Conectar();
		this._clientServie.Listen(this.MensajeEntrante);
	}

	/**
	 * EnviarMensajeNuevo
	 */
	public EnviarMensajeNuevo(parametro: string): void {
		this._clientServie.EnviarMensaje(parametro);
	}

	/**
	 * MensajeEntrante
	 */
	public MensajeEntrante(): void {
		console.log('Entra un mensaje al componente');
	}

	ngOnInit(): void {}
}
