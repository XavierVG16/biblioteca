import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lector } from '../models/lector';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LectorService {
  readonly URL_API = `${environment.URL}/lector`;
  selectedLector: Lector;
  lectores: Lector[];
  constructor(private http: HttpClient) {
    this.selectedLector = new Lector();
   }
   getLectores(){
    return this.http.get(this.URL_API);
  }
  getLector(id: string){
    return this.http.get(this.URL_API+`/${id}`);
  }
  postLector(lector: Lector){
    return this.http.post(this.URL_API, lector);
  }
  putLector(lector: Lector){
    return this.http.put(this.URL_API+`/${lector.id_lector}`, lector);
  }
  deleteLector(id: string){
    return this.http.delete(this.URL_API+`/${id}`);
  }
}
