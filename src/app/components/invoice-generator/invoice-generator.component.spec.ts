import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGeneratorComponent } from './invoice-generator.component';

describe('InvoiceGeneratorComponent', () => {
  let component: InvoiceGeneratorComponent;
  let fixture: ComponentFixture<InvoiceGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
