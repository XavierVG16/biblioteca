import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LibroService } from '../../services/libro.service';
import {Libro} from '../../models/libro';
import { CategoriaService} from '../../services/categoria.service';
import { Categoria} from '../../models/categoria';
import { ToastrService } from 'ngx-toastr';

import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  displayedColumns: string[] = ['isbn_libro', 'titulo_libro', 'autor_libro', 'editorial_libro', 'idioma','stock','publicado','ejemplares','facultad', 'estado', 'accion' ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private toastr: ToastrService,public libroService: LibroService, public categoriaService : CategoriaService) { }

  ngOnInit(): void {
    this.ListaLibros();
    this.ListaCategoria();
  }
  ListaLibros(){
this.libroService.getLibros().
subscribe(res=>{
  console.log(res)
  this.libroService.libros = res as Libro[];
  this.dataSource = new MatTableDataSource(this.libroService.libros);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

})
  }
  ListaCategoria(){
    this.categoriaService.getCategorias()
    .subscribe(res=>{
      this.categoriaService.categorias = res as Categoria[];
    },
    error=>{
console.log(error);
    });
  }
  resetForm(form? : NgForm) {
    if (form) {
        form.reset();
        this.libroService.selectedLibro = new Libro();
    }
}
  addLibro(form? : NgForm) {
    if (form.valid) {

        if (form.value.id_libro) {
            this.libroService.putLibros(form.value).subscribe(res => {
                this.resetForm(form);
                this.ListaLibros();
                this.toastr.success(`${res}`, 'Libro');

            });
        } else {
            this.libroService.postLibros(form.value).subscribe(res => {
                this.ListaLibros();
                this.resetForm(form);
                this.toastr.success(`${res}`, 'Libro');

            });
        } err =>{
          this.toastr.error(`No se puede guardar el Libro `, 'Error!');
        }

    } else {
       
      this.toastr.error(`Complete los campos`, 'Por Favor!');  
    }


}

  editLibro(libro : Libro) {
    this.libroService.selectedLibro = libro;
}

deleteLibro( _id: string) {
  if (confirm('Seguro que deseas eliminar el Libro?')) {
    this.libroService.deleteLibros(_id).subscribe(res => {
        this.ListaLibros();
        this.toastr.success(`${res}`, 'Libro');
      
        // M.toast({html: 'Deleted Succesfully'});
    }, 
    err =>{
        this.toastr.error(`No se puede eliminar el Libro`, 'Error!');
      
    });
  }
}
}
