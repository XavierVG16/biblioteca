import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent } from './components/inicio/inicio.component'
import { ErroComponent } from './components/erro/erro.component';
import {CategoriaComponent} from './components/categoria/categoria.component';
import {LibroComponent} from './components/libro/libro.component';
import {LectorComponent} from './components/lector/lector.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {RegistrarComponent} from './components/prestamos/registrar/registrar.component';
import {PendientesComponent} from './components/prestamos/pendientes/pendientes.component';
import {TodoComponent} from './components/prestamos/todo/todo.component';
import {CheckLoginGuard} from './check-login.guard';

import { from } from 'rxjs';
const routes: Routes = [

  {
    path: 'inicio',
    component: InicioComponent,
    canActivate:[CheckLoginGuard]
   
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
    canActivate:[CheckLoginGuard]
  
  },
  {
    path: 'libros',
    component: LibroComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: 'lectores',
    component: LectorComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: 'prestamos',
    component: RegistrarComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: 'prestamos/pendientes',
    component: PendientesComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: 'prestamos/todo',
    component: TodoComponent,
    canActivate:[CheckLoginGuard]
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
