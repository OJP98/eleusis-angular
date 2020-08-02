import { Injectable, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
	providedIn: 'root',
})
export class ClientService {
	private clientIp: string;
	private subject: WebSocketSubject<any>;

	constructor() {
		this.clientIp = '127.0.0.1';
		this.subject = webSocket({
			url: 'ws://localhost:8080',
		});

		this.subject.subscribe(
			(msg) => console.log('message received: ' + msg.name), // Called whenever there is a message from the server.
			(err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
			() => console.log('complete') // Called when connection is closed (for whatever reason).
		);
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
	 * Devuelve la ip de cliente
	 */
	public GetClientIp(): string {
		this.subject.next({ message: 'Mensaje del cliente' });
		return this.clientIp;
	}
}
