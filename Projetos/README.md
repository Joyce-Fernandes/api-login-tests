# API de Gestão de Login

Esta API foi desenvolvida para fins de estudo de testes de software. Ela simula um sistema de login com bloqueio após tentativas inválidas, lembrete de senha, desbloqueio de usuário, autenticação JWT e documentação via Swagger. Inclui também um frontend simples para testes e geração de relatórios automatizados.

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

## Endpoints principais (todos documentados no Swagger)
- **POST /login**: Realiza login do usuário (retorna JWT)
- **POST /login/reminder**: Retorna lembrete de senha
- **POST /login/unlock**: Desbloqueia usuário bloqueado
- **GET /login/protegida**: Rota protegida, requer JWT no header Authorization

## Documentação Swagger
- Acesse em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Todos os endpoints, exemplos de requisição e resposta, e fluxo de autenticação estão documentados.

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

---

Projeto para fins didáticos. Desenvolvido com foco em clareza, testes, frontend simples, integração contínua e documentação completa. 