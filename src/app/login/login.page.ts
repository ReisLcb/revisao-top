import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular"
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})

export class LoginPage implements OnInit {
  router = inject(Router) 
  UserService:UsuarioService = new UsuarioService() 
  email:string = ""
  senha:string = ""

  constructor() { }

  logar(){
    this.UserService.logar(this.email, this.senha)
  }

  limpar(){
    this.email = ""
    this.senha = ""
  }

  telaCadastro(){
    this.router.navigate(["home"]) 
  }

  ngOnInit() {
  }

}
