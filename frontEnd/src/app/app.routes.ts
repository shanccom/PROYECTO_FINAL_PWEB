import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { DetallesComponent } from './component/detalles/detalles.component';
import { ImprimirComponent } from './component/imprimir-gmail/imprimir-gmail.component';

export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detalles/:id', component: DetallesComponent},
  { path: 'home', component: HomeComponent },
  { path: 'imprimir', component: ImprimirComponent}
  
];