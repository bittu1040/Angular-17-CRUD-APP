import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { authGuard } from './guards/auth.guard';
import { LoginRedirectsComponent } from './components/login-redirects/login-redirects.component';
import { GithubUserComponent } from './components/github-user/github-user.component';
import { RouteDemoComponent } from './components/route-demo/route-demo.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'github-user/:username', component: GithubUserComponent },
  { path: 'github-user', component: GithubUserComponent },
  { path: 'table', component: TableComponent, canActivate: [authGuard] },
  {
    path: 'route-demo',
    component: RouteDemoComponent,
    children: [
      {
        path: 'products',
        component: ProductListComponent,
        title: 'Routing demo',
      },
      { path: 'products/:id', component: ProductDetailsComponent },
    ],
  },
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login-redirect', component: LoginRedirectsComponent },
  { path: '**', component: PageNotFoundComponent },
];
