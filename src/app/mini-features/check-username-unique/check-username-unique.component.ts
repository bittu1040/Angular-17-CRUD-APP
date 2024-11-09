import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, debounceTime, switchMap, map } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-check-username-unique',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './check-username-unique.component.html',
  styleUrl: './check-username-unique.component.scss'
})
export class CheckUsernameUniqueComponent implements OnInit {

  constructor(private data: DataService) { }

  userRegistrationForm!: FormGroup;

  ngOnInit(): void {
    this.userRegistrationForm = new FormGroup({
      username: new FormControl('', [Validators.required], [this.usernameUniqueValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }


  submit(){
    if(this.userRegistrationForm.valid){
      console.log(this.userRegistrationForm.value);
    }
  }

  usernameUniqueValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    return of(control.value).pipe(
      debounceTime(300),
      switchMap((username) =>
        this.data.checkUsernameUniqueness(username).pipe(
          map((isAvailable) => (isAvailable ? null : { usernameTaken: true }))
        )
      )
    );
  };
  


}
