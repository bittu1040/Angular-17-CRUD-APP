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
  searchText: string = '';
  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
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

  // handleClickInside(event: Event){
  //   event.stopPropagation();
  // }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.filteredItems = [];
    }
  }
}
