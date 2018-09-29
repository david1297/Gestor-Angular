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
  constructor(public afs: AngularFirestore) {
    this.UsuariosColection = afs.collection<Usuariosinterface>('Usuarios');
    this.Usuarios = this.UsuariosColection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuariosinterface;
        const Id = a.payload.doc.id;
        return { Id, ...data};
      }))
    );

   }
   GetUsuarios() {
    return this.Usuarios;
  }
}
