import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgToastService } from 'ng-angular-popup';
import { AUTH_ERRORS } from '../../shared/error-constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loginError: string = '';

  username: any;

  authErrors = AUTH_ERRORS;

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: NgToastService
  ) {
    if(this.firebaseAuth.IsLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.firebaseAuth
      .login(email, password)
      .then((data) => {
        this.toastService.success('Login successful', 'LOGIN SUCCESS', 4000);
        this.router.navigateByUrl('/home');
        console.log("login success")
        const user = data.user;
        if (user) {
          this.username = user.displayName || user.email;
          this.firebaseAuth.setUsername(this.username);
        }
      })
      .catch(({ code }) => {
        console.log("login error")
        this.loginError = this.getErrorMessage(code);
        this.toastService.danger(this.loginError, 'LOGIN ERROR', 4000);
      });
  }

  getErrorMessage(errorCode: string): string {
    return this.authErrors[errorCode] || 'An unknown error occurred. Please try again.';
  }
}
