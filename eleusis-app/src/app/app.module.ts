import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MODULOS
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// COMPONENTES
import { AppComponent } from './app.component';
import { ClientTestingComponent } from './components/client-testing/client-testing.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
		AppComponent,
		ClientTestingComponent,
		LobbyComponent,
		NotFoundComponent,
		HomeComponent,
  ],
  imports: [
    BrowserModule,
		MaterialModule,
    AppRoutingModule,
		BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
