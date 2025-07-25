const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /teste-swagger:
 *   get:
 *     tags:
 *       - Teste
 *     summary: Endpoint de teste GET
 *     responses:
 *       200:
 *         description: Teste funcionando
 */
router.get('/teste-swagger', (req, res) => {
  res.json({ ok: true });
});

module.exports = router; 