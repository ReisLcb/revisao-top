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
  nome:string = ""
  senha:string = ""
  UserService:UsuarioService = new UsuarioService()

  constructor() { }

  logar(){
    this.UserService.logar(this.nome, this.senha)
  }

  limpar(){
    this.nome = ""
    this.senha = ""
  }

  telaCadastro(){
    this.router.navigate(["home"])
  }

  ngOnInit() {
  }

}
