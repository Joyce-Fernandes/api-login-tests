# API de Gestão de Login

Esta API foi desenvolvida para fins de estudo de testes de software. Ela simula um sistema de login com bloqueio após tentativas inválidas, lembrete de senha, desbloqueio de usuário, autenticação JWT e documentação via Swagger. Inclui também um frontend simples para testes.

## Funcionalidades
- Login de usuário
- Bloqueio após 3 tentativas inválidas
- Lembrete de senha
- Desbloqueio de usuário via endpoint
- Autenticação JWT (token)
- Documentação Swagger
- Testes automatizados com Mocha, Chai e Supertest
- Relatórios de testes com Mochawesome
- Frontend HTML/JS para simulação de login

## Estrutura de Pastas
```
/src
  ├── controllers
  │   └── authController.js
  ├── middlewares
  │   └── authMiddleware.js
  ├── routes
  │   └── loginRoutes.js
  ├── services
  │   ├── loginService.js
  │   └── users.js
  ├── docs
  │   └── swaggerOptions.js
  ├── utils
  │   └── jwtUtils.js
/public
  └── index.html (frontend)
/tests
  ├── login.test.js
  └── loginService.test.js
README.md
app.js
```

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   node app.js
   # ou
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3000`.

## Frontend
Abra o arquivo `public/index.html` acessando `http://localhost:3000/` no navegador. Você poderá simular login, lembrete de senha e testar o fluxo de bloqueio/desbloqueio.


Todos os endpoints estão documentados no Swagger.

## Documentação Swagger
Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Testes Automatizados e Relatórios

- Os testes estão localizados na pasta `tests/`.
- Execute os testes com:
  ```bash
  npm test
  ```
- O relatório HTML dos testes será gerado em `mochawesome-report/relatorio.html`.
- Para abrir o relatório automaticamente:
  ```bash
  npm run test:report
  ```

## JWT
- O login bem-sucedido retorna um token JWT.
- Use esse token para acessar rotas protegidas, enviando no header:
  ```
  Authorization: Bearer <token>
  ```

## Fluxo de desbloqueio
- Após 3 tentativas inválidas, o usuário é bloqueado.
- Para desbloquear, use o endpoint `/login/unlock` enviando o email:
  ```json
  { "email": "joao@example.com" }
  ```
- O usuário poderá tentar logar novamente normalmente.

## Observações
- Os dados dos usuários estão em memória, definidos em `src/services/users.js`.
- O projeto segue boas práticas de código limpo (Clean Code).
- O workflow de integração contínua roda os testes automaticamente a cada push ou pull request na branch `main` (ver `.github/workflows/test.yml`).

---

Projeto para fins didáticos. Desenvolvido com foco em clareza, testes, frontend simples e documentação. 