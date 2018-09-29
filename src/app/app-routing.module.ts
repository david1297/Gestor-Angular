import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Componentes/home/home.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { LoginComponent } from './Componentes/login/login.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [ AuthGuard ]},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: HomeComponent, canActivate: [ AuthGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
