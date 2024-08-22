import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


export const routes: Routes = [
  {path:"", component: HomeComponent, pathMatch:"full"},
  {path:"home", component: HomeComponent},
  {path:"table", component: TableComponent},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path: "**", component: PageNotFoundComponent}

];
