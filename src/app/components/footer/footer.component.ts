import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxModeSwitcherService } from 'ngx-mode-switcher';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FooterComponent {
  selectedMode = "light";

  constructor(private ngxModeSwitcherService: NgxModeSwitcherService) {
    this.ngxModeSwitcherService.modeChanged$.subscribe((mode: string) => {
      this.selectedMode = mode;
    })
  }
}
