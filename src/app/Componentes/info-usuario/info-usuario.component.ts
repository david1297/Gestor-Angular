import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Usuariosinterface } from '../../Interfaces/Usuarios.Interface';
import { UsuariosService } from '../../services/usuarios.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';



@Component ({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.scss']
})
export class InfoUsuarioComponent implements OnInit {
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  constructor(
    public authService: AuthService,
    public router: Router,
    public usuarioService: UsuariosService,
    public Storage: AngularFireStorage) { console.log( this.usuarioService.Usuarios);

      this.usuarioService.GetUsuarios().subscribe(Usuarios => {
        this.Usuarios = Usuarios;
        console.log('Perro Entro');
      });}
  Usuarios: Usuariosinterface[];
  UsuariosToEdit: Usuariosinterface;
  ngOnInit() {
  }
  onUpdateUsuario(Usuario: Usuariosinterface) {
  this.usuarioService.updateUsuario(Usuario);
 
  }
  upload(event) {
    const file = event.target.files[0];
    const randomId = Math.random().toString(36).substring(2);
    const task = this.Storage.upload(`images/${randomId}`, file).then(() => {
         const ref = this.Storage.ref(`images/${randomId}`);
         const downloadURL = ref.getDownloadURL().subscribe(url => {
          this.uploadURL  = url; // for ts
         console.log(this.uploadURL);
         this.Usuarios[0].Imagen = this.uploadURL;
     });
    });
  }
}