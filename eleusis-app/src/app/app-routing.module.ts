import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientTestingComponent } from './components/client-testing/client-testing.component'

const routes: Routes = [
	{ path: 'lobby', component: LobbyComponent },
	{ path: 'client', component: ClientTestingComponent },
	{ path: '', redirectTo: '/lobby', pathMatch: 'full' },
	{ path: '**',  component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
