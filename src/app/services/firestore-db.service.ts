import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Person {
  id?: string;
  name: string;
  age: number;
  city: string;
  timestamp: string;
}
@Injectable({
  providedIn: 'root',
})
export class FirestoreDbService {
  private collectionName = 'people';
  constructor(private firestore: AngularFirestore) {}

  getPeople(): Observable<Person[]> {
    return this.firestore
      .collection<Person>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  // Add a new person to Firestore
  addPeople(person: Person): Observable<any> {
    return new Observable((observer) => {
      this.firestore
        .collection(this.collectionName)
        .add(person)
        .then(() => observer.next(person))
        .catch((error) => observer.error(error));
    });
  }

  // Update an existing person's data in Firestore
  updatePeople(id: string, person: Person): Observable<any> {
    return new Observable((observer) => {
      this.firestore
        .collection(this.collectionName)
        .doc(id)
        .update(person)
        .then(() => observer.next(person))
        .catch((error) => observer.error(error));
    });
  }

  // Delete a person from Firestore
  deletePeople(id: string): Observable<any> {
    return new Observable((observer) => {
      this.firestore
        .collection(this.collectionName)
        .doc(id)
        .delete()
        .then(() => observer.next({ id }))
        .catch((error) => observer.error(error));
    });
  }
}
