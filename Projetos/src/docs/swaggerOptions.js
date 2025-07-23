const path = require('path');

module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Login',
      version: '1.0.0',
      description:
        'API para estudo de testes de software, com autenticação, bloqueio e lembrete de senha.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')],
};
