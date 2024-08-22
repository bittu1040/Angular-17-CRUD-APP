import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat'; // Compatibility import
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebaseConfig)),
  ],
};
