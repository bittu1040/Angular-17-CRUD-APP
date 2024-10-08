import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { DataService } from '../../data.service';
import { FirestoreDbService } from '../../services/firestore-db.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class UserFormDialogComponent {
  addUserForm: FormGroup;
  editUserForm: FormGroup;
  message = '';
  editDialog = false;
  userId = 0;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private firestoreDbService: FirestoreDbService,
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { message: string; editDialog: boolean; userId: number },
  ) {
    this.message = data ? data.message : '';
    this.editDialog = data.editDialog;
    this.userId = data.userId;

    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      age: ['', Validators.required],
      timestamp: [new Date().toLocaleString()],
    });

    this.editUserForm = this.fb.group({
      name: [''],
      city: [''],
      age: [''],
      timestamp: [new Date().toLocaleString()],
    });

    this.getUserDataForEdit();
  }

  getUserDataForEdit() {
    this.firestoreDbService.getPeople().subscribe((allUserData: any) => {
      console.log('id: ', this.userId);
      allUserData.filter((data: any) => {
        if (data.id === this.userId) {
          this.editUserForm.patchValue(data);
          this.editUserForm.patchValue({
            timestamp: new Date().toLocaleString(),
          });
        }
      });
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      this.dialogRef.close({
        clicked: 'submit',
        userData: form,
      });
    }
  }

  cancel() {
    this.dialogRef.close({
      clicked: 'cancel',
    });
  }
}
