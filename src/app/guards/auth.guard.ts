import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  console.log(route, state)
  const router = inject(Router);
  const authService = inject(FirebaseAuthService);

  console.log("is loggedin ",authService.IsLoggedIn()())
  if (authService.IsLoggedIn()() && state.url == '/login') {
    router.navigate(['/home']);
    return false
  }
  else if (!authService.IsLoggedIn()() && state.url == '/login') {
    return true
  }
  else if(authService.IsLoggedIn()()){
    return true
  }
  return router.navigate(['/login-redirect']);
};
