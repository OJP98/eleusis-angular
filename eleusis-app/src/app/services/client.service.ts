import { Injectable, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject, Observable, Subscription } from 'rxjs';
import { Message } from '../interfaces/message';
import { PropertyRead } from '@angular/compiler';

@Injectable({
	providedIn: 'root',
})
export class ClientService {
	private socketSubscription: Subscription;
	private subject: WebSocketSubject<any>;
	private mensajeSubject$ = new Subject<JSON>();
	private colaDeMensajesSubject$ = new Subject<Message>();
	private newResopnseSubject$ = new Subject<any>();

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
	public Conectar(salaNum: number, userName: string): void {
		this.subject.next({
			option: 1,
			sala: salaNum,
			user: userName,
		});
	}

	/**
	 * Se escucha constantemente al servidor.
	 */
	public Listen(): void {
		if (!this.socketSubscription) {
			this.socketSubscription = this.subject.subscribe(
				(msg) => this.InterpretarRequest(msg), // Called whenever there is a message from the server.
				(err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
				() => console.log('complete') // Called when connection is closed (for whatever reason).
			);
		}
	}

	/**
	 * Interpreta el request mandado por el servidor
	 */
	public InterpretarRequest(mensaje: JSON): void {
		const props: any = mensaje;

		if (props.option === 0) {
			// Servidor manda Error
			this.newResopnseSubject$.next(mensaje);
		} else if (props.option === 1) {
			// Servidor manda Conectar
			this.newResopnseSubject$.next(mensaje);
		} else if (props.option === 2) {
			// Servidor manda Mensaje
			this.mensajeSubject$.next(mensaje);

			const nuevoMensaje: Message = {
				Name: props.user,
				Message: props.mensaje,
				PlayerId: props.id,
			};

			this.colaDeMensajesSubject$.next(nuevoMensaje);
		}
	}

	public get MensajeSubject(): Observable<JSON> {
		return this.mensajeSubject$.asObservable();
	}

	public get ColaDeMensajesSubject(): Observable<Message> {
		return this.colaDeMensajesSubject$.asObservable();
	}

	public get NewResponseSubject(): Observable<any> {
		return this.newResopnseSubject$.asObservable();
	}

	/**
	 * Envia un mensaje a todos los jugadores
	 * de tu sala actual.
	 */
	public EnviarMensaje(mensajeNuevo: Message, sala: number): void {
		this.subject.next({
			option: 2,
			sala,
			user: mensajeNuevo.Name,
			id: mensajeNuevo.PlayerId,
			mensaje: mensajeNuevo.Message,
		});
	}

	/**
	 * Define la regla de juego de determinada
	 * sala
	 */
	public DefinirRegla(sala: number, regla: any) {
		this.subject.next({
			option: 3,
			sala,
			regla,
		});
	}
}
