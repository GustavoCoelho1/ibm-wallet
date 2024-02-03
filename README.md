<a name="readme-top"></a>

![License](https://img.shields.io/badge/License-MIT-green)&nbsp;
<a href="https://www.linkedin.com/in/gustavo-coelho1/">![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)</a>&nbsp;



<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<img src="https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/fa47c396-619c-4c77-be57-3103a954c7af" alt="Logo" width="100" height="100">
  

<h3 align="center">IBM Wallet</h3>

  <p align="center">
    Gerenciamento de transações financeiras
    <br />
    <!--<a href="https://github.com/github_username/repo_name">🌐 Ir para site do projeto</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário da documentação</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#tecnologias-utilizadas">Tecnologias utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#para-começar">Para começar</a>
      <ul>
        <li><a href="#pre-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalacao">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#entendendo-a-estrutura">Entendendo a estrutura</a></li>
    <li><a href="#como-utilizar">Como utilizar?</a></li>
    <li><a href="#licença-mit">Licença MIT</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<br />

## Sobre o projeto

![ibmWalletPrints](https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/5fec03d6-a55c-4c6a-9be5-5dc183ed5fcf)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>




### Tecnologias utilizadas

* ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
* ![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)


<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>




## Para começar

Para configurar e rodar o projeto localmente vamos precisar seguir alguns passos.

### Pré-requisitos do Front-end (Angular)
* Node.js  
O angular é construído usando o Node.js e npm (Node Package Manager). Certifique-se de ter o Node.js instalado, pois o npm é incluído com ele. Clique <a href="https://nodejs.org/en">aqui</a> para instalar.

* npm  
Após instalado o node, abra o terminal do seu computador e rode o seguinte comando:
  ```sh
  npm install npm@latest -g
  ```

* Angular CLI  
Instale a Angular CLI (Command Line Interface) globalmente. Isso facilita a criação e gerenciamento de projetos Angular.
  ```sh
  npm install -g @angular/cli
  ```




### Pré-requisitos do Back-end (Spring)
<a name="pre-requisitos"></a>
* Java Development Kit (JDK)  
Spring Boot é baseado em Java, então você precisará do JDK instalado. Certifique-se de usar uma versão suportada pelo Spring Boot (O projeto utiliza a versão 17 do java). Clique <a href="https://www.oracle.com/br/java/technologies/downloads/#java17">aqui</a> para instalar.

* Banco de dados SQL  
O projeto utiliza banco de dados relacional, então é recomendado ter o banco de dados instalado e configurado corretamente. Clique <a href="https://www.mysql.com/downloads/">aqui</a> para instalar o banco MySql

### Instalação back-end
<a name="instalacao"></a>
1. Clone o repositório da API
   ```sh
   git clone https://github.com/GustavoCoelho1/ibm-wallet-api/
   ```
2. Instale/atualize os novos pacotes Maven em sua IDE.
3. Seguindo a rota `/src/main/src/main/resources` no arquivo `application.yml` defina o nome de suas variáveis de ambiente. O padrão que está no arquivo é:
   ```yml
   spring:
     datasource:
       url: ${DB_URL} ## Url para o banco de dados. Padrão MySql: "jdbc:mysql://localhost:3306/meu_banco_de_dados?user=usuario&password=senha"
       driver-class-name: ${DB_DRIVER} ## Driver do banco de dados (Não obrigatório)
   jpa:
     hibernate:
       ddl-auto: "update" ## Com essa configuração o banco de dados é gerado automaticamente ao rodar o código, sem ser necessário configurar manualmente.
  
   jwt:
     secret: ${JWT_SECRET} ## Segredo para as requisições JWT. Atenção: Ela necessariamente precisa estar num padrão Base64. (Link para converter senhas para padrão Base64 aqui: https://www.base64encode.org/)
   ```

### Instalação front-end

1. Clone o repositório
   ```sh
   git clone https://github.com/GustavoCoelho1/ibm-wallet/
   ```
2. Instale os pacotes npm
   ```sh
   npm install
   ```
3. Crie uma pasta de variáveis de ambiente Angular
   ```sh
   ng generate environments
   ```
4. Seguindo a rota `src/app/environments/` defina o arquivo `environment.development.ts` como:
   ```ts
   export const environment = {
     apiUrl: 'http://localhost:<porta>', //Por padrão a porta Spring boot é 8080
     jwtSecret: '<secret>', //Defina o mesmo secret que foi colocado no back-end 
   };
   ```

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>



## Entendendo a estrutura

Atualmente o projeto conta com 4 entidades, onde 3 delas herdam chave estrangeira do Cliente, pois é ele que cria cada uma delas.
#### Cliente  
Armazena informações pessoais e de Login do cliente. Possui os campos de:
* Nome (name)
* Email (email)
* Senha (password)

Exemplo de um dado de cliente:
```json
  {
    "name": "Gustavo",
    "email": "gustavo@exemplo",
    "password": "exemplo123"
  }
```

#### Transação
Armazena informações das transações efutuadas. Possui os campos de:
* Data de transação (date)
* Valor da transação (value)
* ID de cliente (client_id) (Chave estrangeira)
* ID de categoria (category_id) (Chave estrangeira)
* ID de destinatário/remetente (recipient_id) (Chave estrangeira)

Exemplo de um dado de uma transação:
```json
  {
    "date": "2024-02-01",
    "value": 20.0,
    "client_id": 1,
    "category_id": 1,
    "recipient_id": 1,
  }
```

#### Categoria
Armazena informações do tipo/categoria de uma transação. Possui os campos de:
* Nome (name)
* ID de cliente (client_id) (Chave estrangeira)

Exemplo de um dado de uma categoria:
```json
  {
    "name": "Alimentação"
    "client_id": 1,
  }
```

#### Destinatário/Remetente
Armazena informações do destinatário ou remetente de um tipo de transação.
* Nome (name)
* ID de cliente (client_id) (Chave estrangeira)

Exemplo de um dado de uma categoria:
```json
  {
    "name": "Restaurante XYZ"
    "client_id": 1,
  }
```

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>


## Como utilizar?
<a name="como-utilizar"></a>
1. Fazer o cadastro  
Basta clicar em "Ir para dashboard" na página inicial e depois clicar em "Cadastre-se" na página de login, ou acessar a rota `/signup`
<img src="https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/e1e51563-28a8-45f9-a9d7-f088f364993b" alt="Logo" width="400">

3. Fazer o login  
Basta clicar em "Ir para dashboard" na página inicial, ou acessar a rota `/login` (O acesso durará 1 hora, após isso será solicitado um novo login)
<img src="https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/9f5eaa3e-e30d-43cb-8349-daff17254c0f" alt="Logo" width="400">

4. Criando novo registro  
Após fazer login, você será redirecinado para a rota `/dashboard`, que é a página padrão para a entidade de Transação. Nela clicando no botão "+ Nova transação", você pode inserir um novo registro.
<img src="https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/fb068e51-b72b-47e8-b33f-d2d3ddd59eaf" alt="Logo" width="500">

5. Utilizando funções da tabela  
Na tabela você pode encontrar opções de alterar e deletar. E nas funções adicionais você encontra:
* Limpar tudo: Deleta todos os dados da tabela
* (Apenas para transações) Nova transação em massa: Insere múltiplos registros de uma só vez no banco.
Os dados devem estar no seguinte padrão: "(data),(valor),(nome-da-categoria),(nome-do-destinatario-remetente)", e separados por ";" para cada linha/registro.

Exemplo:
```txt
2022-02-01,-18.00,Alimentação,iFood;
2022-02-02,-18.00,Alimentação,iFood;
2022-02-01,-18.00,Alimentação,iFood;
2022-02-02,-18.00,Transporte,Uber;
```
<img src="https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/b3b164fd-63fd-4653-a9ab-a09cb150f924" alt="Logo" width="500">

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>



## Licença MIT
A permissão é concedida, gratuitamente, a qualquer pessoa que obtenha uma cópia deste arquivo, sem restrição nos direitos de usar, copiar, modificar e mesclar.
Distribuído sob a lincença MIT. Veja `LICENSE.txt` para mais informações.

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>



## Contato

Gustavo Coelho
* Linkedin: <a href="https://www.linkedin.com/in/gustavo-coelho1/">linkedin.com/in/gustavo-coelho1/</a>
* E-mail: <a href="mailto:gustavocoelho1412@gmail.com">gustavocoelho1412@gmail.com</a>
* Repositório: <a href="https://gustavo-coelho-portfolio.vercel.app/">Gustavo Coelho - Repositório</a>

🔗 Link do projeto: [github.com/GustavoCoelho1/ibm-wallet](https://github.com/GustavoCoelho1/ibm-wallet)

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

