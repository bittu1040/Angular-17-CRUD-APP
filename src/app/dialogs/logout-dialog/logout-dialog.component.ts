import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss',
})
export class LogoutDialogComponent {
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LogoutDialogComponent>,
  ) {}

  confirmLogout() {
    this.firebaseAuthService.logout().then(() => {
      this.router.navigate(['/']);
      this.dialogRef.close();
    });
  }
}
