import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Categoria} from '../models/categoria';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  readonly URL_API = `${environment.URL}/categoria`;
  selectedCategoria: Categoria;
  categorias: Categoria[];
  constructor(private http: HttpClient) { 
    this.selectedCategoria = new Categoria();
  }

  getCategorias(){
    return this.http.get(this.URL_API);
  }
  postCategoria(categoria: Categoria){
    return this.http.post(this.URL_API, categoria);
  }
  putCategoria(categoria: Categoria){
    console.log(categoria)
    return this.http.put(this.URL_API+`/${categoria.id}`, categoria);
  }
  deleteCategoria(id: string){
    return this.http.delete(this.URL_API+`/${id}`);
  }
}
