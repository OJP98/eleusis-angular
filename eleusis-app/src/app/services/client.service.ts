import { Injectable, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject, Observable, Subscription } from 'rxjs';
import { Message } from '../interfaces/message';
import { PropertyRead } from '@angular/compiler';
import { Card } from '../interfaces/card';

@Injectable({
	providedIn: 'root',
})
export class ClientService {
	private socketSubscription: Subscription;
	private subject: WebSocketSubject<any>;

	private mensajeSubject$ = new Subject<JSON>();
	private colaDeMensajesSubject$ = new Subject<Message>();
	private newResponseSubject$ = new Subject<any>();

	constructor() {
		// this.subject = webSocket({
		// 	url: 'ws://localhost:8080',
		// });
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

	public SetServer(url: string): void {
		try {
			this.subject = webSocket({ url });
		} catch (error) { }
	}

	/**
	 * Se escucha constantemente al servidor.
	 */
	public Listen(): void {
		if (this.socketSubscription === null || this.socketSubscription === undefined) {
			this.socketSubscription = this.subject.subscribe(
				(msg) => this.InterpretarRequest(msg),
				(err) => this.InterpretarError(err),
				() => console.log('complete')
			);
		}
	}

	/**
	 * Interpreta el request mandado por el servidor
	 */
	public InterpretarRequest(mensaje: JSON): void {
		const props: any = mensaje;

		console.log(mensaje);


		if (props.option === 0) {
			// Servidor manda Error
			this.newResponseSubject$.next(mensaje);
		} else if (props.option === 1) {
			// Servidor manda Conectar
			this.newResponseSubject$.next(mensaje);
		} else if (props.option === 2) {
			// Servidor manda Mensaje
			this.mensajeSubject$.next(mensaje);

			const nuevoMensaje: Message = {
				Name: props.user,
				Message: props.mensaje,
				PlayerId: props.id,
			};

			this.colaDeMensajesSubject$.next(nuevoMensaje);
		} else if (props.option === 4) {
			// Servidor manda Comenzar juego
			this.newResponseSubject$.next(mensaje);
		} else if (props.option === 5) {
			// Servidor manda Juego
			this.newResponseSubject$.next(mensaje);
		} else if (props.option === 6) {
			// Servidor manda Actualiar mesa
			this.newResponseSubject$.next(mensaje);
		} else if (props.option === 7) {
			// Servidor manda No Jugada
			this.newResponseSubject$.next(mensaje);
		} else if (props.option === 8) {
			// Servidor manda Adivinar Regla
			this.newResponseSubject$.next(mensaje);
		} else if (props.option === 9) {
			// Servidor manda Punteo
			this.newResponseSubject$.next(mensaje);
		}
	}

	public InterpretarError(error) {
		this.newResponseSubject$.error(error);
		this.subject = null;
		this.socketSubscription = null;
	}

	public get MensajeSubject(): Observable<JSON> {
		return this.mensajeSubject$.asObservable();
	}

	public get ColaDeMensajesSubject(): Observable<Message> {
		return this.colaDeMensajesSubject$.asObservable();
	}

	public get NewResponseSubject(): Observable<any> {
		return this.newResponseSubject$.asObservable();
	}

	public get WebSocketSubject(): Observable<any> {
		return this.subject.asObservable();
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
	 * El jugador intenta adivinar la regla
	 */
	public AdivinarRegla(intentoRegla: any, sala: number): void {
		this.subject.next({
			option: 8,
			sala,
			intentoRegla,
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

	/**
	 * Comienza el juego de una sala
	 */
	public ComenzarJuego(sala: number) {
		this.subject.next({
			option: 4,
			sala,
		});
	}

	/**
	 * El jugador declara que no tiene cartas validas
	 */
	public NoJugada(sala: number, cartas: Card[]) {
		this.subject.next({
			option: 7,
			sala,
			cartas,
		});
	}

	/**
	 * Envía al servidor datos necesarios para procesar una carta jugada.
	 * @param carta la carta jugada por el usuario
	 * @param sala el id de la sala del jugador
	 */
	public JugarCarta(carta: Card, sala: number) {
		this.subject.next({
			option: 5,
			sala,
			simbolo: carta.symbol,
			valor: carta.value,
			character: carta.character,
		});
	}
}
