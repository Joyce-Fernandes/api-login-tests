/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Login ou senha inválidos
 *       403:
 *         description: Usuário bloqueado por tentativas inválidas
 *       404:
 *         description: Usuário não cadastrado
 *
 * /login/reminder:
 *   post:
 *     summary: Lembrete de senha para o usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lembrete de senha retornado
 *       404:
 *         description: Usuário não cadastrado
 */ 