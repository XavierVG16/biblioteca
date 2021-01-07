import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { DemoMaterialModule } from './material-module';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { ErroComponent } from './components/erro/erro.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { LibroComponent } from './components/libro/libro.component';
import { LectorComponent } from './components/lector/lector.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RegistrarComponent } from './components/prestamos/registrar/registrar.component';
import { PendientesComponent } from './components/prestamos/pendientes/pendientes.component';
import { TodoComponent } from './components/prestamos/todo/todo.component'


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ErroComponent,
    NavegacionComponent,
    LibroComponent,
    LectorComponent,
    CategoriaComponent,
    UsuarioComponent,
    RegistrarComponent,
    PendientesComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    ToastrModule.forRoot({ timeOut: 5000,
      
      preventDuplicates: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
