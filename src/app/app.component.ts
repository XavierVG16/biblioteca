import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LibroService } from './services/libro.service';
import {Libro} from './models/libro';
import {AuthService} from './services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import {UsuarioService} from './services/usuario.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Instituto Superior Tecnológico Vicente León';
  columnsToDisplay = ['LIBRO','EDITORIAL','AUTOR'];
  displayedColumns: string[] = ['isbn_libro', 'titulo_libro', 'autor_libro', 'editorial_libro', 'ejemplar','facultad', 'estado' ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  constructor(public libroService: LibroService, public authService: AuthService,
    private router: Router, public usuarioService: UsuarioService,private toastr: ToastrService){  }
  ngOnInit(): void {
    this.ListaLibros();
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
  getUsuario(form?: NgForm) {
     console.log(form.value)
    this.authService.postUsuario(form.value)
      .subscribe(
        res => {
         this.router.navigate(['/inicio']);
         this.toastr.success(`Administrador`, 'Bienvenido');
         this.authService.selectedUsuario = new Usuario()        

        },
        err => {
         
          this.toastr.error(`${err.error.message}`, 'Error!');
          this.authService.selectedUsuario = new Usuario()        

        });
  }
}
