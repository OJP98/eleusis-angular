import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service'

@Component({
  selector: 'app-client-testing',
  templateUrl: './client-testing.component.html',
  styleUrls: ['./client-testing.component.scss']
})
export class ClientTestingComponent implements OnInit {

  public isConnected: boolean;
  public clientIp: string;
  public inputDePrueba: string;

  constructor(
    private _clientServie: ClientService,
  ) {
    this.isConnected = false;
  }

  public ValidarConexion(parametro: string): void {
    this.clientIp = this._clientServie.GetClientIp();
    console.log(this.clientIp);
    console.log(parametro);
  }

  ngOnInit(): void {
  }

}
