import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface contactForm {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseContactService {
  private collectionName = 'contactForm';

  private firestore = inject(AngularFirestore);
  constructor() {}

  contactFormSubmit(contactForm: contactForm): Observable<contactForm> {
    return new Observable((observer) => {
      this.firestore
        .collection(this.collectionName)
        .add(contactForm)
        .then(() => observer.next(contactForm))
        .catch((error) => observer.error(error));
    });
  }
}
