import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar ,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar'
import { CategoriaService} from '../../services/categoria.service';
import { Categoria} from '../../models/categoria';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  displayedColumns: string[] = ['categoria', 'accion' ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private _snackBar: MatSnackBar,public categoriaService : CategoriaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ListaCategoria();
    this.resetForm();
  }
  resetForm(form? : NgForm) {
    if (form) {
        form.reset();
        this.categoriaService.selectedCategoria = new Categoria();
    }
}
  ListaCategoria(){
    this.categoriaService.getCategorias()
    .subscribe(res=>{
      this.categoriaService.categorias = res as Categoria[];
      this.dataSource = new MatTableDataSource(this.categoriaService.categorias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error=>{
console.log(error);
    });
  }
  addCategoria(form? : NgForm) {
    if (form.valid) {
        console.log(form.value);

        if (form.value.id) {
            this.categoriaService.putCategoria(form.value).subscribe(res => {
                this.resetForm(form);
                this.ListaCategoria();
                this.toastr.success(`${res}`, 'Categoria');

            });
        } else {
          this.resetForm(form);

            this.categoriaService.postCategoria(form.value).subscribe(res => {
                this.ListaCategoria();
                this.resetForm(form);
            
                this.toastr.success(`${res}`, 'Categoria');
            });
        } err =>{
          this.toastr.error(`${err.error.message}`, 'Error!');
        }

    } else {
      this.toastr.error(`Complete los campos`, 'Por Favor!');  
    }


}
  editCategria(categoria : Categoria) {
    this.categoriaService.selectedCategoria = categoria;
}

deleteCategoria( _id: string) {
  if (confirm('Seguro que deseas eliminar la Categoria?')) {
    this.categoriaService.deleteCategoria(_id).subscribe(res => {
        this.ListaCategoria();
        this.toastr.success(`${res}`, 'Categoria');
        this.resetForm();

        // M.toast({html: 'Deleted Succesfully'});
    }, 
    err =>{
       
      this.toastr.error(`No se puede eliminar la Categoria`, 'Error!');  

      
    });
  }
}
 
}
