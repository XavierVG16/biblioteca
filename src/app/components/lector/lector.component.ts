import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

  import { Lector }  from '../../models/lector';
  import { LectorService } from '../../services/lector.service';
  import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-lector',
  templateUrl: './lector.component.html',
  styleUrls: ['./lector.component.css']
})
export class LectorComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'cedula', 'telefono','direccion','tipo','accion' ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor( private toastr: ToastrService, public lectorService: LectorService) { }

  ngOnInit(): void {
    this.listaLectores();
  }
  resetForm(form? : NgForm) {
    if (form) {
        form.reset();
        this.lectorService.selectedLector = new Lector();
    }
}
  listaLectores(){
    this.lectorService.getLectores()
    .subscribe(res=>{
      this.lectorService.lectores = res as Lector[];
      this.dataSource = new MatTableDataSource(this.lectorService.lectores);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
    })
  }

  addLector(form? : NgForm) {
    if (form.valid) {

        if (form.value.id_lector) {
            this.lectorService.putLector(form.value).subscribe(res => {
                this.resetForm(form);
                this.listaLectores();
                this.toastr.success(`${res}`, 'Lector');
            });
        } else {
            this.lectorService.postLector(form.value).subscribe(res => {
                this.listaLectores();
                this.resetForm(form);
                this.toastr.success(`${res}`, 'Lector');

            });
        } err =>{
          this.toastr.error(`${err.error.message}`, 'Error!');

        }

    } else {
      this.toastr.error(`Complete los campos`, 'Por Favor!');  

      }


}


  editLector(lector : Lector) {
    this.lectorService.selectedLector = lector;
}

deleteLector( _id: string) {
  if (confirm('Seguro que deseas eliminar el lector?')) {
    this.lectorService.deleteLector(_id).subscribe(res => {
        this.listaLectores();
        this.toastr.success(`${res}`, 'Lector');
    }, 
    err =>{
      this.toastr.error(`No se puede eliminar el Libro`, 'Error!');

      
      
    });
  }
}
}
