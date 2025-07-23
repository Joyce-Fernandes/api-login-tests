# API de Gestão de Login

Esta API foi desenvolvida para fins de estudo de testes de software. Ela simula um sistema de login com bloqueio após tentativas inválidas, lembrete de senha e documentação via Swagger. **Não utiliza banco de dados, apenas armazenamento em memória.**

## Funcionalidades

- Login de usuário
- Bloqueio após 3 tentativas inválidas
- Lembrete de senha
- Resposta para usuário não cadastrado
- Documentação Swagger
- Testes automatizados com Mocha, Chai e Supertest

## Dependências

- [Express](https://expressjs.com/)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [Mocha](https://mochajs.org/) (dev)
- [Chai](https://www.chaijs.com/) (dev)
- [Supertest](https://github.com/ladjs/supertest) (dev)

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

## Testes Automatizados

Os testes estão localizados na pasta `tests/` na raiz do projeto. Eles cobrem tanto o serviço de login quanto as rotas da API.

### Como rodar os testes

Execute o comando:
```bash
npm test
```

```

OOs testes utilizam as bibliotecas Mocha, Chai e Supertest.

### Estrutura dos testes
- `tests/loginService.test.js`: Testes unitários do serviço de login (validação, bloqueio, lembrete, etc).
- `tests/login.test.js`: Testes de integração das rotas de login da API.

## Como alterar usuários em memória
Os usuários de teste estão definidos em `src/services/loginService.js`. Para adicionar, remover ou alterar usuários, edite o array `users` neste arquivo:
```js
const users = [
  { email: 'joao@example.com', password: '1234', reminder: 'Seu número favorito', attempts: 0, blocked: false },
  { email: 'maria@example.com', password: 'abcd', reminder: 'Nome do seu pet', attempts: 0, blocked: false }
];
```

## Dicas de Troubleshooting
- **Swagger não abre:**
  - Verifique se a pasta `src/docs` existe fisicamente e contém os arquivos `.js` de documentação.
  - Reinicie o servidor após criar ou alterar arquivos de documentação.
  - Confira se a rota `/api-docs` está ativa no console ao iniciar o servidor.
- **Testes não são encontrados:**
  - Certifique-se de que os arquivos de teste estão na pasta `tests/` e terminam com `.test.js`.
  - Use `npm test` para rodar todos os testes.
- **Porta ocupada:**
  - Altere a porta usando a variável de ambiente `PORT`.

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests para sugerir melhorias, novos testes ou correções!

---

Projeto para fins didáticos. Desenvolvido com foco em clareza, testes e documentação. 