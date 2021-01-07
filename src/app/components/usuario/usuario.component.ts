import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import {Usuario} from '../../models/usuario';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido',  'email', 'telefono', 'tipo_usuario', 'accion' ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(  private toastr: ToastrService, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.ListaUsuarios();
  }
  resetForm(form? : NgForm) {
    if (form) {
        form.reset();
        this.usuarioService.selectedUsuario = new Usuario();
    }
}
  ListaUsuarios(){
    this.usuarioService.getUsuarios()
    .subscribe(res =>{
      this.usuarioService.usuarios = res as Usuario[];
      this.dataSource = new MatTableDataSource(this.usuarioService.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error =>{
      console.log(error)
    });
  }
  addUsuario(form? : NgForm) {
    if (form.valid) {

        if (form.value.id_usuario) {
            this.usuarioService.putUsuario(form.value).subscribe(res => {
                this.resetForm(form);
                this.ListaUsuarios();
                this.toastr.success(`${res}`, 'Usuario');

            });
        } else {
            this.usuarioService.postUsuario(form.value)
            .subscribe(res => {
                this.ListaUsuarios();
                this.resetForm(form);
                this.toastr.success(`Guardado con éxito!`, 'Usuario');

            }, err =>{
              this.toastr.error(`${err.error.message}`, 'Error!');

            });
        }

    } else {
      this.toastr.error(`Complete los campos`, 'Por Favor!');  
  
    }


}

  editUsuario(usuario : Usuario) {
    this.usuarioService.selectedUsuario = usuario;
}

deleteUsuario( _id: string) {
  if (confirm('Seguro que deseas eliminar el usuario?')) {
    this.usuarioService.deleteUsuario(_id).subscribe(res => {
        this.ListaUsuarios();
        this.toastr.success(`${res}`, 'Usuario');

      
        // M.toast({html: 'Deleted Succesfully'});
    }, 
    err =>{
      this.toastr.error(`No se puede eliminar el Usuario`, 'Error!');

    });
  }
}
}
