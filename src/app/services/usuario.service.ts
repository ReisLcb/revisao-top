import { inject, Injectable } from '@angular/core';
import { Preferences } from "@capacitor/preferences"
import { Router } from '@angular/router';

export interface User{ 
  nome:string
  cep: string
  rua:string
  numero:number
  dataNasc:string
  email:string
  senha:string
}

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private USER_KEY = "users" 
  router = inject(Router) 

  async cadastrarUsuario(usuario:User):Promise<void>{
    const users = await this.getUsers() || []

    if(!users.some((e => e.nome == usuario.nome && e.email == usuario.email))){ 
      if(usuario.senha.length >= 6){
      users.push(usuario) 

      await Preferences.set({ 
        key: this.USER_KEY,
        value: JSON.stringify(users)
      })

      this.router.navigate(["login"])
     } ("A senha precisa conter pelo menos 6 dígitos") 
    } else alert(`O usuário ${usuario.nome} já está cadastrado`) 
  }

  async getUsers():Promise<User[]>{
    const { value } = await Preferences.get({key: this.USER_KEY})

    return value ? JSON.parse(value) : []
  }

  async logar(email:string, senha:string):Promise<void>{
      const users = await this.getUsers() || [] 
      let user!:User|undefined 
      
      if(email.trim() != "" || senha.trim() != ""){
        if (users.some(e => e.email == email && e.senha == senha)) { 
          user = users.find((usuario) => usuario.email == email && usuario.senha == senha) 

          await Preferences.set({ 
            key: "loggedUser",
            value: JSON.stringify(user)
          })
          console.log(user)

          this.router.navigate(["saida"])
        } else alert(`Nome de usuário ou senha incorretos`)
      } else alert(`Preencha os campos corretamente`)
  }

  async sair(){
    Preferences.remove({key: "loggedUser"})
    this.router.navigate(["login"])
  }

  constructor() {}
}
