import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeDemoComponent } from './date-time-demo.component';

describe('MomentjsDateTimeDemoComponent', () => {
  let component: DateTimeDemoComponent;
  let fixture: ComponentFixture<DateTimeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateTimeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
