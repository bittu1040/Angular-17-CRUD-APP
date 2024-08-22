import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDialogComponent } from './logout-dialog.component';

describe('LogoutDialogComponent', () => {
  let component: LogoutDialogComponent;
  let fixture: ComponentFixture<LogoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
