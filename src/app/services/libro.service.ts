import { Injectable } from '@angular/core';
import { Libro } from '../models/libro';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  selectedLibro: Libro;
  libros : Libro[];
  readonly URL_API = `/app/libro`;
  constructor( private http: HttpClient) { 
    this.selectedLibro = new Libro();
  }
  getLibros(){
    return this.http.get(this.URL_API);
  }
  postLibros(libro: Libro){
    return this.http.post(this.URL_API, libro);
  }
  putLibros(libro: Libro){
    return this.http.put(this.URL_API+`/${libro.id_libro}`, libro);
  }
  deleteLibros(id: string){
    return this.http.delete(this.URL_API+`/${id}`);
  }
}
