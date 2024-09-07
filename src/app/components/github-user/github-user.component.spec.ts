import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubUserComponent } from './github-user.component';

describe('GithubUserComponent', () => {
  let component: GithubUserComponent;
  let fixture: ComponentFixture<GithubUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GithubUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
