import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-client-testing',
	templateUrl: './client-testing.component.html',
	styleUrls: ['./client-testing.component.scss'],
})
export class ClientTestingComponent implements OnInit, OnDestroy {

	private mensajeObservable$: Observable<JSON>;
	private suscripcionMensaje: Subscription;

	public isConnected: boolean;
	public clientIp: string;
	public inputDePrueba: string;
	public mensajeDelSocket: JSON;

	constructor(private _clientService: ClientService) {
		this._clientService.Conectar();
		this._clientService.Listen(this.MensajeEntrante);
	}

	/**
	 * EnviarMensajeNuevo
	 */
	public EnviarMensajeNuevo(parametro: string): void {
		this._clientService.EnviarMensaje(parametro);
	}

	/**
	 * MensajeEntrante
	 */
	public MensajeEntrante(): void {
		console.log('Entra un mensaje al componente');
	}

	public SusbscribeToMessgage(): void {
		this.mensajeObservable$ = this._clientService.MensajeSubject;
		this.suscripcionMensaje = this.mensajeObservable$.subscribe(nuevoMensaje => {
			this.mensajeDelSocket = nuevoMensaje;
			console.log('TENEMOS UN NUEVO MENSAJE', nuevoMensaje);
		});
	}

	ngOnInit(): void {
		this.SusbscribeToMessgage();
	}

	ngOnDestroy(): void {
		this.suscripcionMensaje.unsubscribe();
	}
}
