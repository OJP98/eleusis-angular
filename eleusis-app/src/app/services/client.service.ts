import { Injectable, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ClientService {
	private subject: WebSocketSubject<any>;
	private mensajeSubject$ = new Subject<JSON>();

	constructor() {
		this.subject = webSocket({
			url: 'ws://localhost:8080',
		});
	}
	/*
	ngOninit(): void {
		this.subject.subscribe(
			(msg) => console.log('message received: ' + msg), // Called whenever there is a message from the server.
			(err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
			() => console.log('complete') // Called when connection is closed (for whatever reason).
		);
	}
*/

	/**
	 * Envia un request al servidor para
	 * conectarse a una sala.
	 */
	public Conectar(): void {
		this.subject.next({
			option: 1,
			sala: 5001,
			user: 'BigJ',
		});
	}

	/**
	 * Se escucha constantemente al servidor.
	 */
	public Listen(mensajeEntrante: any): void {
		this.subject.subscribe(
			(msg) => this.ex(msg), // Called whenever there is a message from the server.
			(err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
			() => console.log('complete') // Called when connection is closed (for whatever reason).
		);
	}

	/**
	 * ex
	 */
	public ex(mensaje: JSON): void {
		this.mensajeSubject$.next(mensaje);
	}

	public get MensajeSubject(): Observable<JSON> {
		return this.mensajeSubject$.asObservable();
	}

	/**
	 * Envia un mensaje a todos los jugadores
	 * de tu sala actual.
	 */
	public EnviarMensaje(mensajeNuevo: string): void {
		this.subject.next({
			option: 2,
			sala: 5001,
			user: 'BigJ',
			id: 0,
			mensaje: mensajeNuevo,
		});
	}
}
