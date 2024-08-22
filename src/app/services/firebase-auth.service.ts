import { Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private usernameSignal = signal<string | null>(null);
  private isLoggedInSignal = signal<boolean>(false);

  constructor(private afAuth: AngularFireAuth) {
    console.log("first call")
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.usernameSignal.set(storedUsername);
      this.isLoggedInSignal.set(true);
    }
   }

  setUsername(username: string) {
    localStorage.setItem('username', username);
    this.usernameSignal.set(username);
    this.isLoggedInSignal.set(true);
  }

  getUsername() {
    return this.usernameSignal;
  }

  IsLoggedIn() {
    return this.isLoggedInSignal;
  }


  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('username');
    this.usernameSignal.set(null);
    this.isLoggedInSignal.set(false);
    return this.afAuth.signOut();
  }

  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
