import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniFeaturesComponent } from './mini-features.component';

describe('MiniFeaturesComponent', () => {
  let component: MiniFeaturesComponent;
  let fixture: ComponentFixture<MiniFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniFeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
