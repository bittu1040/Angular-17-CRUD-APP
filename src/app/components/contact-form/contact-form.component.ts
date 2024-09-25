/*
service id-  service_rzze9xg
template id- template_hmt3nrt


*/

import { Component, inject } from '@angular/core';
import emailjs from 'emailjs-com';

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
          console.log('Form submitted successfully', data);
          this.toastService.success(
            'Form submitted successfully',
            'CONTACT FORM',
            4000,
          );
          const templateParams = {
            from_name: this.contactForm.value.name,
            from_email: this.contactForm.value.email,
            message: this.contactForm.value.message,
            to_name: 'Bittu',
          };

          emailjs
            .send(
              'service_rzze9xg',
              'template_hmt3nrt',
              templateParams,
              'SBRyfBr7EaLxkreY3',
            )
            .then(
              (response) => {
                console.log(
                  'Email sent successfully!',
                  response.status,
                  response.text,
                );
                this.toastService.success(
                  'Email sent successfully',
                  'CONTACT FORM',
                  4000,
                );
                this.contactForm.reset();
              },
              (error) => {
                console.error('Failed to send email...', error);
                this.toastService.danger(
                  'Failed to send email',
                  'CONTACT FORM',
                  4000,
                );
              },
            );
        },
        error: (error) => {
          console.error('Error adding user to Firestore', error);
          this.toastService.danger(
            'Failed to submit form',
            'CONTACT FORM',
            4000,
          );
        },
      });
    }
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
