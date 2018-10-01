import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuariosinterface } from '../Interfaces/Usuarios.Interface';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  UsuariosColection: AngularFirestoreCollection<Usuariosinterface>;
  Usuarios: Observable<Usuariosinterface[]>;
  UsuariosDoc: AngularFirestoreDocument<Usuariosinterface>;
  public User: AngularFirestore;
  constructor(public afs: AngularFirestore) { }

  getUserLogin(Correo: string) {
    this.UsuariosColection = this.afs.collection<Usuariosinterface>('Usuarios',
     ref => ref.where('Correo', '==', Correo ));
    this.Usuarios = this.UsuariosColection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuariosinterface;
        const Id = a.payload.doc.id;
        return { Id, ...data};
      }))
    );
    return this.Usuarios;
  }

   GetUsuarios() {
    return this.Usuarios;
  }
  updateUsuario(Usuario: Usuariosinterface) {
    this.UsuariosDoc = this.afs.doc(`Usuarios/${Usuario.Id}`);
    this.UsuariosDoc.update(Usuario);

}
