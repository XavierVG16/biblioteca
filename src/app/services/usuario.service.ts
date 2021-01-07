import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  selectedUsuario: Usuario;
  usuarios: Usuario[];
  readonly URL_API = `${environment.URL}/usuario`;

  constructor(private http: HttpClient) {
    this.selectedUsuario = new Usuario();
}
getUsuarios() {
  return this.http.get(this.URL_API);
}
getUsuario(idusuario:  string) {
  return this.http.get<Usuario>(this.URL_API +  `/${idusuario}`);
}
postUsuario(usuario: Usuario) {
  return this.http.post(this.URL_API, usuario);
}
putUsuario(usuario: Usuario) {
  return this.http.put(this.URL_API + `/${usuario.id_usuario}`, usuario);
}
deleteUsuario(id_usuario: string) {
  return this.http.delete(this.URL_API + `/${id_usuario}`);
}
}
