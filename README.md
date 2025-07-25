#  🚀 Mentoria 2.0 Desafio 3 grupo 3



## API de Gestão de Login

Esta API foi desenvolvida para fins de estudo de testes de software. Ela simula um sistema de login com bloqueio após tentativas inválidas, lembrete de senha, desbloqueio de usuário, autenticação JWT e documentação via Swagger. Inclui também um frontend simples para testes e geração de relatórios automatizados. **Não utiliza banco de dados, apenas armazenamento em memória.**

## Funcionalidades

- Login de usuário
- Bloqueio após 3 tentativas inválidas
- Lembrete de senha
- Resposta para usuário não cadastrado
- Documentação Swagger
- Relatorios de testes mochawesome-report
- Testes automatizados com Mocha, Chai e Supertest

## Estrutura do Projeto

```
Projetos/
├── app.js                  # Arquivo principal do servidor Express
├── package.json            # Dependências e scripts
├── README.md               # Documentação do projeto
├── public/                 # Frontend HTML/JS
│   └── index.html          # Interface web para login, lembrete e desbloqueio
├── src/
│   ├── controllers/
│   │   └── authController.js      # Lógica dos endpoints de autenticação
│   ├── middlewares/
│   │   └── authMiddleware.js      # Middleware de autenticação JWT
│   ├── routes/
│   │   ├── loginRoutes.js         # Rotas principais da API
│   │   └── swaggerTestRoutes.js   # Rota de teste para Swagger
│   ├── services/
│   │   ├── loginService.js        # Lógica de login, bloqueio, lembrete, desbloqueio
│   │   └── users.js               # Usuários em memória
│   ├── docs/
│   │   └── swaggerOptions.js      # Configuração do Swagger
│   └── utils/
│       └── jwtUtils.js            # Utilitário para geração/validação de JWT
├── tests/
│   ├── login.test.js              # Testes de integração das rotas
│   └── loginService.test.js       # Testes unitários do serviço de login
├── mochawesome-report/            # Relatórios HTML dos testes
│   └── relatorio.html
└── .github/
    └── workflows/
        └── test.yml               # CI para rodar testes automaticamente
```

## Frontend
- Acesse `http://localhost:3000/` para utilizar a interface web.
- Permite simular login, lembrete de senha, bloqueio e desbloqueio de usuário.
- Validação de campos e feedback visual.
<img width="650" height="688" alt="Captura de pantalla 2025-07-25 164400" src="https://github.com/user-attachments/assets/1549bb4d-fe67-455f-8dc5-4bd4fbfcd548" />

## Dependências

### Produção
- **express**: Framework web para Node.js, usado para criar a API e servir o frontend.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **jsonwebtoken**: Para geração e validação de tokens JWT (autenticação).
- **swagger-jsdoc**: Gera documentação Swagger a partir de comentários JSDoc.
- **swagger-ui-express**: Serve a interface Swagger UI para documentação interativa da API.

### Desenvolvimento
- **mocha**: Framework de testes para Node.js.
- **chai**: Biblioteca de asserções para testes (usada com Mocha).
- **supertest**: Testes de integração para APIs Express.
- **jest**: Outro framework de testes (não obrigatório se já usa Mocha/Chai).
- **mochawesome**: Gera relatórios HTML bonitos para os testes do Mocha.

## Como rodar o projeto

1. Instale as dependências:

   ```bash
   npm install

   ```
2. Inicie o servidor:
   ```bash
   node app.js
   ```
   Ou, para rodar em outra porta:
   ```bash
   PORT=4000 node app.js
   ```

O servidor estará disponível em `http://localhost:3000` (ou na porta definida).

## Exemplos de uso com curl

### Login com sucesso
```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"email":"joao@example.com","password":"1234"}'

```

### Lembrete de senha
```bash
curl -X POST http://localhost:3000/login/reminder \
-H "Content-Type: application/json" \
-d '{"email":"joao@example.com"}'

```

## Endpoints

### POST /login
Realiza o login do usuário.

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "1234"
}

```
**Respostas:**
- 200: Login realizado com sucesso
  ```json
  { "message": "Login realizado com sucesso!" }
  ```
- 401: Login ou senha inválidos
  ```json
  { "message": "Login ou senha inválidos." }
  ```
- 403: Usuário bloqueado por tentativas inválidas
  ```json
  { "message": "Usuário bloqueado por tentativas inválidas." }
  ```
- 404: Usuário não cadastrado
  ```json
  { "message": "Usuário não cadastrado." }
  ```

### POST /login/reminder
Retorna o lembrete de senha do usuário.

**Body:**
```json
{
  "email": "joao@example.com"
}
```
**Respostas:**
- 200: Lembrete de senha retornado
  ```json
  { "message": "Lembrete de senha: Seu número favorito" }
  ```
- 404: Usuário não cadastrado
  ```json
  { "message": "Usuário não cadastrado." }
  ```

## Documentação Swagger
Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
<img width="755" height="691" alt="Captura de pantalla 2025-07-25 143705" src="https://github.com/user-attachments/assets/b1308703-d4d7-42ba-83e7-77b3e44c13c3" />

## Testes Automatizados

Os testes estão localizados na pasta `tests/` na raiz do projeto. Eles cobrem tanto o serviço de login quanto as rotas da API.

### Como rodar os testes

Execute o comando:
```bash
npm test
```

```

Os testes utilizam as bibliotecas Mocha, Chai e Supertest.

Estrutura dos testes

- `tests/loginService.test.js`: Testes unitários do serviço de login (validação, bloqueio, lembrete, etc).
- `tests/login.test.js`: Testes de integração das rotas de login da API.

Como alterar usuários
Os usuários estão definidos manualmente em memória no arquivo src/services/loginService.js:

```const users = [
  {
    email: 'joao@example.com',
    senha: '1234',
    reminder: 'Seu número favorito',
    attempts: 0,
    blocked: false
  },
  {
    email: 'maria@email.com',
    senha: 'abcd',
    reminder: 'Nome do seu pet',
    attempts: 0,
    blocked: false
  }
];

```

## JWT
- O login bem-sucedido retorna um token JWT.
- Use o token para acessar rotas protegidas, enviando no header:
  ```
  Authorization: Bearer <token>
  ```

## Fluxo de bloqueio e desbloqueio
- Após 3 tentativas inválidas, o usuário é bloqueado.
- Para desbloquear, envie um POST para `/login/unlock` com o email:
  ```json
  { "email": "joao@example.com" }
  ```
- O usuário poderá tentar logar novamente normalmente.

## Testes Automatizados e Relatórios
- Testes unitários e de integração em `/tests`.
- Execute com:
  ```bash
  npm test
  ```
- Relatório HTML gerado em `mochawesome-report/relatorio.html`.
- Para abrir automaticamente:
  ```bash
  npm run test:report
  ```

## Integração Contínua (CI)
- Workflow GitHub Actions em `.github/workflows/test.yml`.
- Roda os testes automaticamente a cada push ou pull request na branch `main`.

## Observações e Boas Práticas
- Usuários estão em memória, definidos em `src/services/users.js`.
- Projeto segue boas práticas de código limpo (Clean Code).
- Estrutura modularizada para facilitar manutenção e testes.
- Documentação e exemplos claros para facilitar o estudo e uso.

## Dicas e Resolução de Problemas
- **Swagger não abre:**
  - Verifique se a pasta `src/docs` existe fisicamente e contém os arquivos `.js` de documentação.
  - Reinicie o servidor após criar ou alterar arquivos de documentação.
  - Confira se a rota `/api-docs` está ativa no console ao iniciar o servidor.
- **Testes não são encontrados:**
  - Certifique-se de que os arquivos de teste estão na pasta `tests/` e terminam com `.test.js`.
  - Use `npm test` para rodar todos os testes.
- **Porta ocupada:**
  - Altere a porta usando a variável de ambiente `PORT`.


## Resultado dos Testes
**Todos os testes estão passando com sucesso:**
<img width="1515" height="836" alt="mocha" src="https://github.com/user-attachments/assets/2c13a837-1fe8-4675-b3db-2b8f5dc26eb3" />

Testes da API de Login

    ✔ POST /login deve retornar 200 com mensagem de sucesso
    ✔ POST /login com credenciais inválidas deve retornar 401
    ✔ POST /login com email inexistente deve retornar 404
    ✔ POST /login/reminder deve retornar lembrete de senha
    ✔ POST /login/reminder com email inexistente deve retornar 404

  loginService
  
    ✔ deve realizar login com sucesso
    ✔ deve retornar inválido para senha errada
    ✔ deve bloquear após 3 tentativas inválidas
    ✔ deve retornar lembrete de senha
    ✔ deve retornar not_found para usuário inexistente

  10 passing (56ms)

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests para sugerir melhorias, novos testes ou correções!
 
Projeto para fins didáticos. Desenvolvido com foco em clareza, testes e documentação. 
