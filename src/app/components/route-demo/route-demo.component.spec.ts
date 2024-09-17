import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDemoComponent } from './route-demo.component';

describe('RouteDemoComponent', () => {
  let component: RouteDemoComponent;
  let fixture: ComponentFixture<RouteDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
