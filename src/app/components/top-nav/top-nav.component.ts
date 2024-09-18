import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {
  NgClass,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../dialogs/logout-dialog/logout-dialog.component';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
    SlicePipe,
    MatSlideToggleModule,
    NgClass,
    TitleCasePipe,
    TranslateModule
  ],
})
export class TopNavComponent implements OnInit {
  isDarkTheme = false;
  @Output() sidenavToggle = new EventEmitter<void>();
  public dialog = inject(MatDialog);
  public authService = inject(FirebaseAuthService);
  translate= inject(TranslateService)

  username = this.authService.getUsername();
  isLoggedIn = this.authService.IsLoggedIn();

  ngOnInit(): void {
    this.initializeTheme();
    this.translate.setDefaultLang('en');
  }
  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('dark-theme', JSON.stringify(this.isDarkTheme));
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('dark-theme');
    console.log('dark', savedTheme);

    if (savedTheme !== null) {
      this.isDarkTheme = JSON.parse(savedTheme);
    } else {
      this.isDarkTheme = false;
    }

    if (this.isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);  
  }
}
