import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule]
})
export class DeleteDialogComponent {

  message = '';

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string }
  ) {
    this.message = data ? data.message : '';
  }

  submit(){
    this.dialogRef.close({
      clicked: 'submit',
    });
  }

  cancel(){
    this.dialogRef.close({
      clicked: 'cancel',
    });
  }
}
