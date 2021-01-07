import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prestamo } from '../models/prestamo';
import { Libro } from '../models/libro';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  readonly URL_API = `${environment.URL}/prestamo`;

  selectedPrestamo: Prestamo;
  prestamos: Prestamo[];
  selectedLibro: Libro;
  libros : Libro[];
  constructor(private http: HttpClient) { 
    this.selectedPrestamo = new Prestamo();
    this.selectedLibro = new Libro();
  }
  getPrestamos(){
    return this.http.get(this.URL_API);
  }

  getPrestamos_pendientes(){
    return this.http.get(this.URL_API+'/pendiente');
  }
  getPrestamos_Lectores(){
    return this.http.get(this.URL_API+'/lectores');
  }
  getPrestamos_Libros(){
    return this.http.get(this.URL_API+'/libros');
  }
  postPrestamo(prestamo: Prestamo){
    return this.http.post(this.URL_API, prestamo);
  }
  putPrestamo(id: string ,prestamo : string){
    const prestamo_datos = new FormData();
    prestamo_datos.append('estado_prestamo', prestamo);
    return this.http.put(this.URL_API+`/${id}`, prestamo_datos );
  }
  postRegistro(inicio: string ,fin : string){
    const datos = new FormData();
    datos.append('inicio', inicio);
    datos.append('fin', fin);

    return this.http.post(this.URL_API+'/registro     ', datos);
  }
}
