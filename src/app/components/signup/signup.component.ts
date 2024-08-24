import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AUTH_ERRORS } from '../../shared/error-constants';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({});
  signupError: string = '';
  authErrors = AUTH_ERRORS;

  constructor(
    private fb: FormBuilder,
    private firebaseAuth: FirebaseAuthService,
    private router: Router,
    private toastService: NgToastService
  ) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // passwordMatchValidator(control: AbstractControl) {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  //   if (password?.value !== confirmPassword?.value) {
  //     return { mismatch: true };
  //   }
  //   return null;
  // }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // return null if password is invalid
    if(password?.invalid) return null;

    // check if password/confirmed password mached
    // if not matched then return error
    // else return null
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    confirmPassword?.setErrors(null);
    return null;
  };

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Email:', this.signupForm.value.email);
      console.log('Password:', this.signupForm.value.password);
      this.firebaseAuth
        .register(this.signupForm.value.email, this.signupForm.value.password)
        .then((data) => {
          console.log('register success', data);
          this.toastService.success('User created successfully', 'SIGNUP SUCCESS', 4000);
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.log(error);
          this.signupError = this.getErrorMessage(error.code);
          this.toastService.danger(this.signupError, 'SIGNUP ERROR', 4000);
        });
    }
  }

  getErrorMessage(errorCode: string): string {
    return this.authErrors[errorCode] || 'An unknown error occurred. Please try again.';
  }
}
