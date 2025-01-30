import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnChanges {
  @Input() open: boolean = false;
  @Input() headerText!: string;
  @Input() data!: { [key: string]: any };
  @Output() sideBarToggled: EventEmitter<boolean> = new EventEmitter();
  columns!: string[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue) {
      console.log(changes['data'].currentValue);
      this.columns = Object.keys(changes['data'].currentValue);
    }
  }

  toggleSidebar() {
    this.open = !this.open;
    this.sideBarToggled.emit(this.open);
  }
}
