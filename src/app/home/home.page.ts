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
    if(this.nome.trim() != "" && this.senha.trim() != ""){ // Tira os espaços e verifica se o nome e senha não estão vazios
        this.UserService.cadastrarUsuario({nome: this.nome, senha: this.senha}) // Chama cadastrarUsuario() do serviço do usuário

        this.nome = ""
        this.senha = "" // Limpa o nome e senha
    } else alert(`Preencha corretamente todos os campos`) // mensagem de erro
  }

  limpar(){
    this.nome = ""
    this.senha = ""
  }

  telaLogin(){ // Navega para a tela de login
    this.router.navigate(["login"])
  }
}
