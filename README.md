# Clonando ou baixando repósitório em sua máquina
- Para baixar este repoitório, clique em `code` e em `Download zip`
    - Descompacte o arquivo zip, extraia em sua máquina e execute no Visual Studio Code
- Para clonar este repositório em sua máquina, utilize o seguinte comando:
   ```bash
   git clone https://github.com/ReisLcb/revisao-top.git
   ```

- Para instalar as dependências, basta executar no terminal dentro da pasta local do projeto:
  ```bash
  npm install

- Ao final da instalação, execute o projeto:
  ```bash
  ionic serve
  ```

# Criando projeto Ionic
## Iniciando projeto
- Primeiro, devemos verificar se o ionic CLI está instalado verificando sua versão:
    ```bash
    ionic -v 
    ## Ultima versão: 8.4.x
- Caso não esteja instalado, instale o ionic CLI com o seguinte comando:
    ```bash
    sudo npm install -g @ionic/cli

- Para iniciar, iniciaremos o nosso terminal (pode ser **Linux**, **PowerShell** ou **WSL**):
    ```bash
    ionic start nome-do-seu-projeto
    ```
    
   - Para uma inicialização mais rápida, podemos preencher todos os argumentos com o seguinte comando:
        ```bash
        ionic start [nome] [template] [opções]
        ## [nome] será o nome do projeto desejado (ex. meuApp)
        ## [template] pode ser: 'blank', 'tabs', 'sidemenu', 'list' ou 'my-first-app' (depende do framework)
        ## [opções] podem ser: --list, --type=<tipo>, --cordova, --capacitor e --id=<id>
        ```
     
   - Como usaremos o angular standalone, podemos escrever:
       ```bash
       ionic start meuApp blank --type=angular-standalone
       ## Considerando que nosso projeto será Blank
       ```
    
- Navegue até a pasta do projeto:
    ```bash
    cd nome-do-seu-projeto
- Para executar seu projeto, execute:
    ```bash
    ionic serve
- E para abrir seu projeto no Visual Studio Code, execute:
    ```bash
    code .
# Definindo novas páginas, serviços e rotas
- Para definir uma nova página, basta executar:
    ```bash
    ionic generate
    ## Usar este comando sem argumentos te dará uma tela para escolher o que deseja gerar
    ```
    - Para usar esse comando de forma mais rápida, pode executar:
      ```Bash
      ionic generate [schematic] [name]
      ## [schematic] pode ser: 'page', 'directive', 'component' ou 'service' 
      ```

    - Neste caso, no lugar de ```[schematic]``` escrevemos ```page``` ou `service`, e para ```[name]``` escrevemos o nome da nossa nova página ou serviço
## Arquivo de rotas
![image](https://github.com/user-attachments/assets/8fff08db-8500-45d5-9746-1ade71e08b02)

### Solução simples
- Caso a navegação seja entre páginas fixas, podemos usar:
  
  ![image](https://github.com/user-attachments/assets/c82b3523-60de-411a-8ffb-990b5fef3ba7)

### Solução programática
- Se precisar de mais controle, como redirecionamento condicional, podemos utilizar o Router no arquivo .ts
  
  1°: importamos o Router para o nosso projeto.
  
  ![image](https://github.com/user-attachments/assets/c57e8e06-7024-44d1-b629-f0feafcc2506)

  2°: Injetamos o Router na nossa página.
  
  ![image](https://github.com/user-attachments/assets/eb8b17f2-24ed-4c84-8f44-5358ee68d560)

  3° criamos um método para nos enviar para a página desejada.
  ![image](https://github.com/user-attachments/assets/58e92c59-bb1d-414c-a009-d2fc0716983f)

  4°: No arquivo .html de nossa página/componente, Chamamos nosso método abrirAbout() com a diretiva ```(click)```

  ![image](https://github.com/user-attachments/assets/fd4b7ed4-e315-4046-af8c-9042d25f6d0f)
\
\

# Serviços
- Contém o código do backend do nosso projeto
- Os métodos usados no projeto são declarados dentro da classe do serviço
   ```typescript
  import { Injectable } from '@angular/core';
  import { Preferences } from "@capacitor/preferences"

  @Injectable({
    providedIn: 'root'
  })
   
  export class ExemploService {
     private atributo!:any // ! indica que o atributo não foi iniciado com algum valor
     
    constructor() {}
  
     async metodo(){
       //corpo do código
     }
  }
   ```
## Instalação do Preferences
  - Dentro da raíz do projeto, abra o terminal e digite:
    ```bash
    npm install @capacitor/preferences
    ```
  - O Capacitor é uma biblioteca que permite utilizar os componentes do dispositivo que executa o seu projeto
      - Preferences é um serviço que permite armazenar e recuperar dados de forma persistente
      - Auxílio para armazenar dados que serão utilizados por outra página
      - Semelhante ao localStorage
        ```typescript
        export class UsuarioService {
            private USER_KEY = "user" // Chave que será usada para identificar o objeto a ser armazenado
          
            async cadastrarUsuario(usuario:User):Promise<void>{
                      await Preferences.set({ // Guarda o objeto
                        key: this.USER_KEY,
                        value: JSON.stringify(usuario)
                      })
                  }

              constructor(){}
        }
        ```
      - Para pegar o valor atrelado a chave, usamos:
        ```typescript
        Preferences.get({key: this.USER_KEY})
        // Pode ser armazenado numa variável ou não
        ```
  ## Obter valores específicos do Preferences ou Promises
  - O valor retornado por uma chamada `Preferences.get()` é sempre uma **Promise**
  - Para armazenar o valor retornado de uma promisse em um atributo ou variável, é preciso usar os método `.then()`, `.catch()` e/ou `.finally()`
  - Esses métodos recebem uma **Arrow function** recebendo como parâmetro o valor a ser recebido da promisse (sendo bem-sucedida ou não)
    ```typescript
      let p1 = new Promise((resolve, reject) =>{
            resolve(true)
            reject(false)
      }).then((valor) => return valor) // retorna o valor de 'resolve' caso a promise seja bem-sucedida
        .catch((valor) =< return valor) // retorna o valor de 'reject' caso a promise falhe
    ```
  - Para recuperar um dado do Preferences dentro do arquivo do front-end de uma página, basta realizar o mesmo processo:
    ```typescript
    import { Component } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { IonicModule } from "@ionic/angular"
    import { UsuarioService } from '../services/usuario.service';
    import { Preferences } from '@capacitor/preferences';
    
    @Component({
        selector: 'app-saida',
        templateUrl: './saida.page.html',
        styleUrls: ['./saida.page.scss'],
        standalone: true,
        imports: [IonicModule, FormsModule]
    })
    
    export class SaidaPage {
          nome:any = Preferences.get({key: "loggedUser"}).then((value:any) => this.nome = JSON.parse(value["value"]).nome)
          // Procura pelo usuário dentro do preferences
          // Preferences.get({key: "loggedUser"}) retorna uma promisse
          // .then() procura pelo valor caso a promisse retorne o objeto
          // O objeto do usuário logado está na forma de string e o JSON.parse() muda para a notação de objeto
          // Depois de convertido, pegamos a propriedade 'nome' do objeto e armazenamos dentro de this.nome
        
          constructor() {  }
        
          ngOnInit() {
          }
    }
    ```

# Fontes
**Documentação Ionic: __[Ionic Framework](https://ionicframework.com/docs/cli)__** \
**Promises: __[MDN web docs](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)__** \
**Array.prototype.some(): __[MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)__** \
**Códigos e slides de Aula: __[Moodle](http://moodle.pep2.ifsp.edu.br/login/index.php)__**
