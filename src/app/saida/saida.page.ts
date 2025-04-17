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
  email:any = Preferences.get({key: "loggedUser"}).then((value:any) => this.email = JSON.parse(value["value"]).email)
  dataNasc:any = Preferences.get({key: "loggedUser"}).then((value:any) => this.dataNasc = JSON.parse(value["value"]).dataNasc)
  cep:any = Preferences.get({key: "loggedUser"}).then((value:any) => this.cep = JSON.parse(value["value"]).cep)
  rua:any = Preferences.get({key: "loggedUser"}).then((value:any) => this.rua = JSON.parse(value["value"]).rua)
  numero:any = Preferences.get({key: "loggedUser"}).then((value:any) => this.numero = JSON.parse(value["value"]).numero)

  router = inject(Router)
  userService:UsuarioService = new UsuarioService()
  
  sair(){ 
    this.userService.sair() 
  }

  constructor() {  }

  ngOnInit() {
  }
}
