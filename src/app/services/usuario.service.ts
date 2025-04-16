import { inject, Injectable } from '@angular/core';
import { Preferences } from "@capacitor/preferences"
import { Router } from '@angular/router'; // Navegar entre as páginas

export interface User{ // Interface do usuário que será usado
  nome:string
  senha:string
}

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private USER_KEY = "users" // Chave que será usada para armazenar o array de usuários
  router = inject(Router) // Ingeta o router na página

  async cadastrarUsuario(usuario:User):Promise<void>{
    const users = await this.getUsers() || [] // Chama this.getUsers() para retornar o vetor de usuários (vazio se não houver nenhum usuário)

    if(!users.some((e => e.nome == usuario.nome))){ // Verifica a existência de um usuário com as mesmas credenciais dentro do vetor
      users.push(usuario) // Cadastra caso não haja

      await Preferences.set({ // Guarda o vetor dentro do Preferences
        key: this.USER_KEY,
        value: JSON.stringify(users)
      })

      this.router.navigate(["login"]) // Navega para a página de login
    } else alert(`O nome de usuário ${usuario.nome} já está cadastrado`) // Mensagem de erro
  }

  async getUsers():Promise<User[]>{ // Método para retornar o vetor de usuários
    const { value } = await Preferences.get({key: this.USER_KEY})

    return value ? JSON.parse(value) : []
  }

  async logar(nome:string, senha:string):Promise<void>{
      const users = await this.getUsers() || [] // Retorna os usuários
      let user!:User|undefined // Declara uma variável que pode conter um usuário ou undefined

      if (users.some(e => e.nome == nome && e.senha)) { // Verifica a existência de um usuário com as credenciais digitadas no login
        user = users.find((usuario) => usuario.nome == nome && usuario.senha == senha) // O usuário é armazenado na variável

        await Preferences.set({ // Guarda o usuário logado dentro do Preferences
          key: "loggedUser",
          value: JSON.stringify(user)
        })

        this.router.navigate(["saida"]) // Navega para a página de saída
      } else alert(`Nome de usuário ou senha incorretos`)
  }

  async sair(){
    Preferences.remove({key: "loggedUser"}) // Remove o usuário logado do Preferences
    this.router.navigate(["login"]) // Navega para o login
  }

  constructor() {}
}
