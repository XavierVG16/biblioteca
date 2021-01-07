import { Component, OnInit } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import {UsuarioService} from '../../services/usuario.service'
import {Usuario} from './../../models/usuario';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  id: string;

  constructor( public authService: AuthService, public usuarioService : UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.getUsuario();
  }
  getUsuario(){
    this.id = this.authService.getToken()
    this.authService.getUser(this.id)
    .subscribe(res => {
      console.log(res)
      
      this.authService.selectedUsuario = res as Usuario;
    }, error=>{
      console.log(error)
    })
  }
  salir(){
    this.authService.logout()
  }

}
