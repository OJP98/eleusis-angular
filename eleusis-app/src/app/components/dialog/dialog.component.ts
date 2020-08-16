import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

	public validForm = false;
	public rule: any;

	constructor(
		public dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public dialogData: any,
	) { }

	openDialog() {
		this.dialog.open(DialogComponent);
	}

	public CancelGuess(): void {
		this.dialog.closeAll();
	}

	public SendGuess(): void {
		this.dialog.closeAll();
	}

	public CheckRulesForm(newData: any): void {

		if (newData.valid) {
			this.validForm = true;
			this.rule = newData.rule;

		} else {
			this.validForm = false;
			this.rule = null;
		}

	}

}
