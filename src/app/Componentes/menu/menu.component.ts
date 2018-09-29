import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Usuariosinterface } from '../../Interfaces/Usuarios.Interface';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
public isLogin: boolean;
public emailUsuario: string;
public fotoUsuario: string;
public Login: string;
public Apellido: string;
public Direccion: string;
public Nombre: string;
public Telefono: string;
public Id: string;

Usuarios: Usuariosinterface[];
UsuariosToEdit: Usuariosinterface;
  constructor(public authService: AuthService,
    public router: Router, public usuarioService: UsuariosService ) {this.Login = 'hidden';

  }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.isLogin = true;
        this.emailUsuario = auth.email;
        this.fotoUsuario = auth.photoURL;
        this.Login = '';
        console.log('Loget');
        this.usuarioService.getUserLogin(this.emailUsuario).subscribe(Usuarios => {
          this.Usuarios = Usuarios;
          this.Usuarios.forEach( User => {
            console.log(this.Usuarios);
              this.Apellido = User.Apellido;
              this.Nombre = User.Nombre;
              this.Direccion = User.Direccion;
              this.Telefono = User.Telefono;
              this.Id = User.Id;
          });
        });
      } else {
        this.isLogin = false;
        this.Login = 'hidden';
        console.log('No Loget');
      }
    }); /*
    this.usuarioService.GetUsuarios().subscribe(Usuarios => {
      this.Usuarios = Usuarios;
      this.Usuarios.forEach( User => {
        console.log(this.Usuarios);
        if (User.Correo === this.emailUsuario ) {
          this.Apellido = User.Apellido;
          this.Nombre = User.Nombre;
          this.Direccion = User.Direccion;
          this.Telefono = User.Telefono;
        }
      });
    });*/
  }
  onClickLogout() {
    this.authService.logout();
  }
  onClickupdate() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        auth.updateProfile({
          displayName: 'ane Q. User',
          photoURL: 'https://example.com/jane-q-user/profile.jpg'
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });
      }
    });
  }

}
