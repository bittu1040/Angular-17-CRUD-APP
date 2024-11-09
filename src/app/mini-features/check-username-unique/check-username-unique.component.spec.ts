import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUsernameUniqueComponent } from './check-username-unique.component';

describe('CheckUsernameUniqueComponent', () => {
  let component: CheckUsernameUniqueComponent;
  let fixture: ComponentFixture<CheckUsernameUniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckUsernameUniqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckUsernameUniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
