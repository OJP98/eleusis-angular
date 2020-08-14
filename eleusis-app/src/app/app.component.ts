import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appTitle = 'Eleusis-App'

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {

    this.matIconRegistry.addSvgIcon(
      'clubs',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/cubs.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'hearts',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/hearts.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'spades',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/spades.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'diamonds',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/diamonds.svg')
    );
  }
}
