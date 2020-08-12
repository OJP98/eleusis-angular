import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MODULOS
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

// COMPONENTES
import { AppComponent } from './app.component';
import { ClientTestingComponent } from './components/client-testing/client-testing.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { CardComponent } from './components/card/card.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ClientTestingComponent,
    LobbyComponent,
    NotFoundComponent,
    HomeComponent,
    ChatWindowComponent,
    CardComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
