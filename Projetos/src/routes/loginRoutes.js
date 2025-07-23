const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/', loginController.login);

/**
 * @swagger
 * /login/reminder:
 *   post:
 *     summary: Envia lembrete de senha para o e-mail informado
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *     responses:
 *       200:
 *         description: Lembrete de senha enviado
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/reminder', loginController.passwordReminder);

module.exports = router;
