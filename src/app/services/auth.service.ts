import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient ,HttpParams, HttpHeaders} from '@angular/common/http';
//import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'
import { BehaviorSubject, Observable, throwError  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

const helper = new JwtHelperService
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

  private LoggedIn = new BehaviorSubject<boolean>(false);

  constructor( private http: HttpClient, private router: Router ) {
    this.selectedUsuario = new Usuario();
    this.checkToken();
   }

   get isLogged(): Observable<boolean>{
     return this.LoggedIn.asObservable();
   }


   postUsuario(usuario): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = {
      headers: headers,
    };



    return this.http.post<Usuario>(this.URL_API, usuario)
  
    .pipe(
      map((res: Usuario) =>{
        console.log(res);
        this.saveToken(res.token);
        this.LoggedIn.next(true)
        return res;

      }),
    )
}
loggedIn() {
  return !!localStorage.getItem('token');

}

logout() : void{
  localStorage.removeItem('token');
  this.LoggedIn.next(false)

  this.router.navigate(['/']);
  
 // window.location.reload();
}

getToken() {
  return localStorage.getItem('token');
}
setToken(token): void {
  localStorage.setItem("accessToken", token);
}
getUser(id: string){
  return this.http.get<Usuario>(this.URL_API+`user/${id}`,this.httpOptions)
}

private saveToken(token:string): void {
  localStorage.setItem('token', token);
}

private checkToken(): void{

  const userToken = localStorage.getItem('token');
  const isExpired = helper.isTokenExpired(userToken) ;
  console.log(isExpired)
  if (isExpired){
    this.logout();
  }else{
    this.LoggedIn.next(true);
  }

}


}
