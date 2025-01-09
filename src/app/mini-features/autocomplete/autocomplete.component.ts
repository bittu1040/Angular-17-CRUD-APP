import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {
  items: string[] = ['Ruby', 'Typescript', 'JavaScript', 'Python', 'Java'];
  searchText: string = this.items[0];
  filteredItems: string[] = [];
  showDropdown: boolean = false;

  constructor(private elementRef: ElementRef) { }

  filter() {
    this.filteredItems = this.items.filter(item => item.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  showSuggestions() {
    this.filteredItems = this.items;
  }

  selectItem(item: string) {
    this.searchText = item;
    this.filteredItems = [];
  }

  handleClickInside(event: Event){
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('input') && !target.closest('.suggestions')) {
      this.filteredItems = [];
    }
  }
}
