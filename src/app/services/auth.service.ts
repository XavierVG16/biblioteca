import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
//import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly URL_API = `autenticar/`;
  user = {}
  selectedUsuario: Usuario;
  usuario: Usuario[];
  constructor( private http: HttpClient, private router: Router ) {
    this.selectedUsuario = new Usuario();
   }
   postUsuario(usuario) {
    return this.http.post<any>(this.URL_API, usuario)
    console.log(this.URL_API)

}
loggedIn() {
  return !!localStorage.getItem('token');
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/']);
  
  window.location.reload();
}

getToken() {
  return localStorage.getItem('token');
}
setToken(token): void {
  localStorage.setItem("accessToken", token);
}
getUser(id: string){
  return this.http.get<Usuario>(this.URL_API+`user/${id}`)
}
}
