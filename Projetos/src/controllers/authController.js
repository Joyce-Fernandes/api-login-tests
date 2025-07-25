// src/controllers/authController.js
const loginService = require('../services/loginService');

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }
  const result = loginService.login(email, password);
  if (result.status === 'success') {
    return res.status(200).json({ status: 'success', token: result.token });
  } else if (result.status === 'blocked') {
    return res.status(403).json({ status: 'blocked', message: 'Usuário bloqueado.' });
  } else if (result.status === 'not_found') {
    return res.status(404).json({ status: 'not_found', message: 'Usuário não encontrado.' });
  } else {
    return res.status(401).json({ status: 'invalid', message: 'Credenciais inválidas.' });
  }
};

exports.passwordReminder = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório' });
  }
  const result = loginService.passwordReminder(email);
  if (result.status === 'success') {
    return res.status(200).json({ status: 'success', reminder: result.reminder });
  } else {
    return res.status(404).json({ status: 'not_found', message: 'Usuário não encontrado.' });
  }
};

exports.unlock = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório' });
  }
  const result = loginService.unlockUser(email);
  if (result.status === 'success') {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ status: 'not_found', message: 'Usuário não encontrado.' });
  }
};
