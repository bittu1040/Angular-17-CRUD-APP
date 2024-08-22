import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink]
})
export class TopNavComponent {

  @Output() sidenavToggle = new EventEmitter<void>();

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
