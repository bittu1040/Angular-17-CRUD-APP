import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { SlicePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../dialogs/logout-dialog/logout-dialog.component';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenuModule, SlicePipe]
})
export class TopNavComponent implements OnInit{

  isDarkTheme="";
  @Output() sidenavToggle = new EventEmitter<void>();
  public dialog = inject(MatDialog);
  public authService = inject(FirebaseAuthService);

  username = this.authService.getUsername();
  isLoggedIn = this.authService.IsLoggedIn();



  ngOnInit(): void {
    // this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // if (this.isLoggedIn) {
    //   this.username = localStorage.getItem('username');
    // }
  }
  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
