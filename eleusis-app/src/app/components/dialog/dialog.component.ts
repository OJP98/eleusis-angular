import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

	constructor(
		public dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public dialogData: any
		) { }

	openDialog() {
		this.dialog.open(DialogComponent);
	}

}
