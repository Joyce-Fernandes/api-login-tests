// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const loginRoutes = require('./src/routes/loginRoutes');
const swaggerOptions = require('./src/docs/swaggerOptions');
const swaggerTestRoutes = require('./src/routes/swaggerTestRoutes');

console.log('Swagger apis:', swaggerOptions.apis);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
app.use('/login', loginRoutes);
app.use('/', swaggerTestRoutes);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
