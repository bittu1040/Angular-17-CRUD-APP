import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentjsDateTimeDemoComponent } from './momentjs-date-time-demo.component';

describe('MomentjsDateTimeDemoComponent', () => {
  let component: MomentjsDateTimeDemoComponent;
  let fixture: ComponentFixture<MomentjsDateTimeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MomentjsDateTimeDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MomentjsDateTimeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
