import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import { AuthService } from './servicios/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { HomeComponent } from './Componentes/home/home.component';
import { MenuComponent } from './Componentes/menu/menu.component';
import { LoginComponent } from './Componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UsuariosService } from './services/usuarios.service';
import {  AngularFireStorageModule } from 'angularfire2/storage';
import { InfoUsuarioComponent } from './Componentes/info-usuario/info-usuario.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    InfoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Gestor-Proyectos'),
    AngularFirestoreModule,
    FlashMessagesModule,
    AngularFireStorageModule
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService, UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
