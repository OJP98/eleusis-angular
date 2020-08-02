import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientIp: string;

  constructor() {
    this.clientIp = '127.0.0.1'
  }

  /**
   * Devuelve la ip de cliente
   */
  public GetClientIp(): string {
    return this.clientIp;
  }
}
