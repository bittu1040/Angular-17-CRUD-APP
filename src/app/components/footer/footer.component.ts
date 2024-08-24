import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModeSwitcherService } from 'ng-mode-switcher';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FooterComponent {
  selectedMode = "light";

  constructor(private ngModeSwitcherService: NgModeSwitcherService) {
    this.ngModeSwitcherService.modeChanged$.subscribe((mode: string) => {
      this.selectedMode = mode;
    })
  }
}
