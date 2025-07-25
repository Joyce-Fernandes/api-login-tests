// src/services/loginService.js
const { users, findUser } = require('./users');
const { generateToken } = require('../utils/jwtUtils');

exports.login = (email, password) => {
  const user = findUser(email);
  if (!user) return { status: 'not_found' };
  if (user.blocked) return { status: 'blocked' };
  if (user.password === password) {
    user.attempts = 0;
    const token = generateToken({ email: user.email });
    return { status: 'success', token };
  } else {
    user.attempts++;
    if (user.attempts >= 3) {
      user.blocked = true;
      return { status: 'blocked' };
    }
    return { status: 'invalid' };
  }
};

exports.passwordReminder = (email) => {
  const user = findUser(email);
  if (!user) return { status: 'not_found' };
  return { status: 'success', reminder: user.reminder };
};

exports.unlockUser = (email) => {
  const user = findUser(email);
  if (!user) return { status: 'not_found' };
  user.attempts = 0;
  user.blocked = false;
  return { status: 'success', message: 'Usuário desbloqueado com sucesso.' };
};

// Funções auxiliares para testes
exports.__getUsers = () => users;
exports.__getUser = (email) => findUser(email);
