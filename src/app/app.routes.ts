import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


export const routes: Routes = [
  {path:"", component: HomeComponent, pathMatch:"full"},
  {path:"home", component: HomeComponent},
  {path:"table", component: TableComponent},
  {path: "**", component: PageNotFoundComponent}

];
