import { OnInit, Component, ViewChild } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import {Libro} from '../../models/libro';
import { Lector }  from '../../models/lector';
import { LectorService } from '../../services/lector.service';
import { PrestamoService } from '../../services/prestamo.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet } from 'ng2-charts';
import {animate, state, style, transition, trigger} from '@angular/animations';


import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
   animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class InicioComponent implements OnInit {


lector_data ;
  
  dataSource ;
 
  columnsToDisplay = ['LIBRO','EDITORIAL','AUTOR','TOTAL'];
  columnsToDisplay_Lector = ['nombre','apellido','ci','total'];

  totalLibros ;
  totalLectores;
  totalPrestamos ;
  totalPendientes;
  a : number;
  b;
  @ViewChild(MatPaginator) paginator: MatPaginator;

    // Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels: Label[] = [['Prestamos', 'Pendientes'], ['Prestamos', 'Finalizados']];
    public pieChartData: SingleDataSet = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    applyFilter_lector(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.lector_data.filter = filterValue.trim().toLowerCase();
    }
  constructor(public libroService: LibroService, public prestamoService: PrestamoService, public lectorService:LectorService ) {
  
   }
  
  ngOnInit(): void {
      monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.Libros();
    this.lectores();
    this.pendientes();
    this.prestamos();
    this.prestamo_libros();
    this.prestamo_lectores();
    this.pieChartData = [this.totalPendientes,3]
 
   
  }
  Libros(){
    this.libroService.getLibros()
    .subscribe(res=>{
      
      this.libroService.libros = res as Libro[];
      this.totalLibros= this.libroService.libros.length
    })
  }

  lectores(){
    this.lectorService.getLectores()
    .subscribe(res=>{
      this.lectorService.lectores =res as Lector[];

this.totalLectores =  this.lectorService.lectores.length

    })
  }
   
  prestamos(){
    this.prestamoService.getPrestamos()
    .subscribe(res=>{
      this.prestamoService.libros =  res as Libro[];
      this.totalPrestamos = this.prestamoService.libros.length
      
      this.pieChartData = [ this.totalPendientes,this.prestamoService.libros.length,]


    })
  }
  pendientes(){
    this.prestamoService.getPrestamos_pendientes()
    .subscribe(res=>{
      this.prestamoService.libros = res as Libro[];
      this.prestamos();
      this.totalPendientes = this.prestamoService.libros.length
    })
  }
  
  prestamo_lectores(){
  this.prestamoService.getPrestamos_Lectores()
  .subscribe(res =>{
    this.prestamoService.libros= res as Libro[];
    console.log(this.prestamoService.libros)
    this.lector_data = new MatTableDataSource ( this.prestamoService.libros);
  })
}
prestamo_libros(){
  this.prestamoService.getPrestamos_Libros()
  .subscribe(res =>{
    this.prestamoService.libros= res as Libro[];
    this.dataSource = new MatTableDataSource(this.prestamoService.libros); 
    
    this.dataSource.paginator = this.paginator;
  })
}

}
