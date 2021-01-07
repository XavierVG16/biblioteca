import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PrestamoService } from '../../../services/prestamo.service';
import {Libro} from '../../../models/libro';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido','isbn_libro', 'titulo_libro', 'autor_libro', 'editorial_libro', 'estado', 'accion' ];
  dataSource;
  estado_prestamo = '0';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private toastr: ToastrService, public prestamoService: PrestamoService) { }

  ngOnInit(): void {
    this.ListaLibros();
  }
  ListaLibros(){
this.prestamoService.getPrestamos_pendientes().
subscribe(res=>{
  this.prestamoService.libros = res as Libro[];
  this.dataSource = new MatTableDataSource(this.prestamoService.libros);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

})
  }

  EntregarLibro(id){
    
   
    this.prestamoService.putPrestamo(id, this.estado_prestamo)
    .subscribe(res=>{
      this.ListaLibros();
      this.toastr.success(`${res}`, 'Libro');
    }, error=>{
      this.toastr.error(`Algo salio mal `, 'Error!');
    });
  }
}