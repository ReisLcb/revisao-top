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
  email:string = ""
  cep:string = ""
  rua:string = ""
  numero:string = ""
  senha:string = ""
  dataNasc:string = ""
  UserService:UsuarioService = new UsuarioService()
  router = inject(Router)

  constructor() {}

  cadastrar(){
    if(this.nome.trim() != "" && this.senha.trim() != "" && this.email.trim() != "" && this.cep.trim() != "" && this.rua.trim() != "" && this.numero.trim() != "" && this.dataNasc.trim() != ""){
      let posicao = this.email.indexOf("@")
      if(posicao != -1 && this.email.length > posicao){
      if(this.senha.length >= 6){
        this.UserService.cadastrarUsuario({
          nome: this.nome, 
          cep: this.cep, 
          rua: this.rua, 
          numero: Number(this.numero), 
          dataNasc: this.dataNasc, 
          email: this.email, 
          senha: this.senha})

        this.nome = ""
        this.email = ""
        this.cep = ""
        this.rua = ""
        this.numero = ""
        this.senha = ""
        this.dataNasc = ""
      } else alert("A senha precisa conter pelo menos 6 dígitos")
    } else alert("Insira um e-mail válido")
    } else alert(`Preencha corretamente todos os campos`)
  }

  limpar(){
    this.nome = ""
    this.email = ""
    this.cep = ""
    this.rua = ""
    this.numero = ""
    this.senha = ""
    this.dataNasc = ""
  }

  telaLogin(){
    this.router.navigate(["/login"])
  }
}
