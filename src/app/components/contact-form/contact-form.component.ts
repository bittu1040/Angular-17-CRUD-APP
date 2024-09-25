import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FirebaseContactService } from '../../services/firebase-contact.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  contactForm: FormGroup;

  contactService = inject(FirebaseContactService);
  toastService = inject(NgToastService);

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.contactFormSubmit(this.contactForm.value).subscribe({
        next: (data) => {
          console.log('User added successfully', data);
          this.toastService.success('Sent successfully', 'CONTACT FORM', 4000);
          this.contactForm.reset();
        },
        error: (error) => console.error('Error adding user', error),
      });
    }

    // const sendEmail = this.fns.httpsCallable('sendEmail');
    // sendEmail(this.contactForm.value).subscribe(
    // result => console.log('Email sent successfully'),
    // error => console.error('Error sending email', error)
    // );
  }

  get EmailInvalid() {
    if (
      this.contactForm.get('email')?.invalid &&
      this.contactForm.get('email')?.touched
    ) {
      return true;
    }
    return false;
  }

  get EmailRequired() {
    if (
      this.contactForm.get('email')?.touched &&
      this.contactForm.get('email')?.errors?.['required']
    ) {
      return true;
    }
    return false;
  }
}
