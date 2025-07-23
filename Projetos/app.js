const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const loginRoutes = require('./src/routes/loginRoutes');
const swaggerOptions = require('./src/docs/swaggerOptions');

const app = express();

app.use(express.json());

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
app.use('/login', loginRoutes);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

module.exports = app; // exporta a app para testes

// Somente executa o servidor se rodar este arquivo diretamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
}
module.exports = app; // <- necessário para testes com Supertest