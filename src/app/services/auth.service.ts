import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient , HttpHeaders} from '@angular/common/http';
//import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly URL_API = `${environment.URL}/autenticar/`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  user = {}
  selectedUsuario: Usuario;
  usuarios: Usuario[];
  constructor( private http: HttpClient, private router: Router ) {
    this.selectedUsuario = new Usuario();
   }
   postUsuario(usuario) {
    return this.http.post<any>(this.URL_API, usuario, this.httpOptions)

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
