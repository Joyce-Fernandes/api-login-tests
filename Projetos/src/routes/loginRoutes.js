const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /login/unlock:
 *   post:
 *     tags:
 *       - Autenticacao
 *     summary: Desbloqueia o usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario desbloqueado com sucesso
 *       404:
 *         description: Usuario nao encontrado
 */
router.post('/unlock', authController.unlock);

/**
 * @swagger
 * /login/protegida:
 *   get:
 *     tags:
 *       - Autenticacao
 *     summary: Rota protegida JWT
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso autorizado
 *       401:
 *         description: Token invalido
 */
router.get('/protegida', authMiddleware, (req, res) => {
  res.status(200).json({
    message: `Bem-vindo, ${req.user.email}! Esta é uma rota protegida.`,
  });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Efetua login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 *       403:
 *         description: Usuário bloqueado
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/', authController.login);

/**
 * @swagger
 * /login/reminder:
 *   post:
 *     summary: Retorna o lembrete de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lembrete retornado
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/reminder', authController.passwordReminder);

module.exports = router;
