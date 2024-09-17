import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTopNavComponent } from './product-top-nav.component';

describe('ProductTopNavComponent', () => {
  let component: ProductTopNavComponent;
  let fixture: ComponentFixture<ProductTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTopNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
