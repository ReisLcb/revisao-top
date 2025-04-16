import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular"
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.page.html',
  styleUrls: ['./saida.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})

export class SaidaPage implements OnInit {
  nome:any = Preferences.get({key: "loggedUser"}).then((value:any) => this.nome = JSON.parse(value["value"]).nome)
  // Procura pelo usuário dentro do preferences
  // Preferences.get({key: "loggedUser"}) retorna uma promisse
  // .then() procura pelo valor caso a promisse retorne o objeto
  // O objeto do usuário logado está na forma de string e o JSON.parse() muda para a notação de objeto
  // Depois de convertido, pegamos a propriedade 'nome' do objeto e armazenamos dentro de this.nome

  router = inject(Router)
  userService:UsuarioService = new UsuarioService() // instância da classe UsuarioService
  
  sair(){ // Método para sair da conta
    this.userService.sair() // Chama o método sair() do UsuárioService
  }

  constructor() {  }

  ngOnInit() {
  }
}
