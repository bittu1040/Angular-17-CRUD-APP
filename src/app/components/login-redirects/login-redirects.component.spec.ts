import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRedirectsComponent } from './login-redirects.component';

describe('LoginRedirectsComponent', () => {
  let component: LoginRedirectsComponent;
  let fixture: ComponentFixture<LoginRedirectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRedirectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginRedirectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
