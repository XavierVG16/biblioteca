import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LibroService } from '../../../services/libro.service';
import {Libro} from '../../../models/libro';
import { Lector } from 'src/app/models/lector';
import { LectorService } from '../../../services/lector.service';
import { PrestamoService} from '../../../services/prestamo.service';
import {  NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import {UsuarioService} from '../../../services/usuario.service'
import {Usuario} from '../../../models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  id: string;
  displayedColumns: string[] = ['isbn_libro', 'titulo_libro', 'autor_libro', 'editorial_libro','cantidad', 'stock','facultad', 'estado', 'accion' ];
  dataSource;
  lector: Lector;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public authService: AuthService, public usuarioService : UsuarioService, public libroService: LibroService, public lectorService: LectorService, public prestamoService: PrestamoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ListaLibros();
    this.getUsuario()
  }
  getUsuario(){
    this.id = this.authService.getToken()
    this.authService.getUser(this.id)
    .subscribe(res => {
      
      this.authService.selectedUsuario = res as Usuario;
    }, error=>{
      console.log(error)
    })
  }
  ListaLibros(){
this.libroService.getLibros().
subscribe(res=>{
  this.libroService.libros = res as Libro[];
  this.dataSource = new MatTableDataSource(this.libroService.libros);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

})
  }
  selectLibro(libro : Libro) {
    this.libroService.selectedLibro = libro;
}
FilterLector(form?: NgForm) {

  if(form.valid){
    this.lectorService.getLector(form.value.ci)
    .subscribe(res=>{
   
     this.lectorService.selectedLector= res as Lector;
    }, error =>{
      this.toastr.error('Lector no se encuentra registrado ', 'Error!');
      this.lectorService.selectedLector =  new Lector;
    });
  } else{
    this.toastr.error('Ingrese la Cedula de Indentidad del Lector', 'Por Favor!');

  }
 
}
addPrestamo(form?: NgForm){
  
    // console.log(this.lectorService.selectedLector)

 if(form.valid){
  this.prestamoService.postPrestamo(form.value)
  .subscribe(res=>{
  
    this.toastr.success('Prestamo Registrado!', 'Correcto!');
    this.ListaLibros();
    this.lectorService.selectedLector =  new Lector;
    this.libroService.selectedLibro = new Libro;
  }, err =>{
    console.log(err)
    this.toastr.error(`${err.error.message}`, 'Error!');

  });

 }else{
  this.toastr.error('Complete los camposr', 'Por Favor!');

 }
  
}
}
