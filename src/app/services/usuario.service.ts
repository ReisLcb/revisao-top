import { inject, Injectable } from '@angular/core';
import { Preferences } from "@capacitor/preferences"
import { Router } from '@angular/router';

export interface User{
  nome:string
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

    if(!users.some((e => e.nome == usuario.nome))){
      users.push(usuario)

      await Preferences.set({
        key: this.USER_KEY,
        value: JSON.stringify(users)
      })

      this.router.navigate(["login"])
    } else alert(`O nome de usuário ${usuario.nome} já está cadastrado`)
  }

  async getUsers():Promise<User[]>{
    const { value } = await Preferences.get({key: this.USER_KEY})

    return value ? JSON.parse(value) : []
  }

  async logar(nome:string, senha:string):Promise<void>{
      const users = await this.getUsers() || []
      let user!:User|undefined

      if (users.some(e => e.nome == nome && e.senha)) {
        user = users.find((usuario) => usuario.nome == nome && usuario.senha == senha)

        await Preferences.set({
          key: "loggedUser",
          value: JSON.stringify(user)
        })

        this.router.navigate(["saida"])
      } else alert(`Nome de usuário ou senha incorretos`)
  }

  async sair(){
    Preferences.remove({key: "loggedUser"})
    this.router.navigate(["login"])
  }

  constructor() {}
}
