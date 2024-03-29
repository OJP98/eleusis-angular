import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../../interfaces/message';
import { Observable, Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/interfaces/player';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  private messagesObservable$: Observable<Message>
  private messageSuscription: Subscription;
  private player: Player;

  public messageList: Message[] = [];
  public inputField: string;

  constructor(
    private clientService: ClientService,
    private playerService: PlayerService,
  ) {
    this.player = this.playerService.CurrentPlayer;
  }

  private ManageMessageSuscription(): void {
    this.messagesObservable$ = this.clientService.ColaDeMensajesSubject;
    this.messageSuscription = this.messagesObservable$.subscribe(newMessage => {
      this.messageList.unshift(newMessage);
    });
  }

  public SendMessage(message: string): void {

    if (this.inputField.replace(/\s/g, '').length) {
      // Crear objeto tipo mensaje
      const newMessage: Message = {
        Name: this.player.Name,
        PlayerId: this.player.Id,
        Message: message,
      }
      // Enviar mensaje con client service
      this.clientService.EnviarMensaje(newMessage, this.playerService.LobbyId);

      // Pushear mensaje a la lista
      this.messageList.unshift(newMessage);
      this.inputField = '';
    }
  }

  ngOnInit(): void {
    this.ManageMessageSuscription();
  }

  ngOnDestroy(): void {
    this.messageSuscription.unsubscribe();
  }

}
