import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent } from './components/inicio/inicio.component'
import { ErroComponent } from './components/erro/erro.component';
import { AuthGuard } from './auth.guard';
import {CategoriaComponent} from './components/categoria/categoria.component';
import {LibroComponent} from './components/libro/libro.component';
import {LectorComponent} from './components/lector/lector.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {RegistrarComponent} from './components/prestamos/registrar/registrar.component';
import {PendientesComponent} from './components/prestamos/pendientes/pendientes.component';
import {TodoComponent} from './components/prestamos/todo/todo.component';
import { from } from 'rxjs';
const routes: Routes = [

  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'libros',
    component: LibroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lectores',
    component: LectorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'prestamos',
    component: RegistrarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'prestamos/pendientes',
    component: PendientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'prestamos/todo',
    component: TodoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: ErroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
