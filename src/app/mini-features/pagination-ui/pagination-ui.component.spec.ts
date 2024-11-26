import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationUIComponent } from './pagination-ui.component';

describe('PaginationUIComponent', () => {
  let component: PaginationUIComponent;
  let fixture: ComponentFixture<PaginationUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationUIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
