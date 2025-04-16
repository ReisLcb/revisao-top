import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular"
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, FormsModule],
})

export class HomePage {
  nome:string = ""
  senha:string = ""
  UserService:UsuarioService = new UsuarioService()
  router = inject(Router)

  constructor() {}

  cadastrar(){
    if(this.nome.trim() != "" && this.senha.trim() != ""){
        this.UserService.cadastrarUsuario({nome: this.nome, senha: this.senha})

        this.nome = ""
        this.senha = ""
    } else alert(`Preencha corretamente todos os campos`)
  }

  limpar(){
    this.nome = ""
    this.senha = ""
  }

  telaLogin(){
    this.router.navigate(["login"])
  }
}
