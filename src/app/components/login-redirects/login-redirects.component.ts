import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-redirects',
  standalone: true,
  imports: [],
  templateUrl: './login-redirects.component.html',
  styleUrl: './login-redirects.component.scss'
})
export class LoginRedirectsComponent {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
