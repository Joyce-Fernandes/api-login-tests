const loginService = require('../services/loginService');

exports.login = (req, res) => {
  const { email, senha } = req.body;
  const result = loginService.login(email, senha);

  if (result.status === 'success') {
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  } else if (result.status === 'blocked') {
    return res.status(403).json({ message: 'Usuário bloqueado por tentativas inválidas.' });
  } else if (result.status === 'not_found') {
    return res.status(404).json({ message: 'Usuário não cadastrado.' });
  } else {
    return res.status(401).json({ message: 'Login ou senha inválidos.' });
  }
};

exports.passwordReminder = (req, res) => {
  const { email } = req.body; // ❗ senha não é necessária aqui
  const reminder = loginService.passwordReminder(email);

  if (reminder.status === 'not_found') {
    return res.status(404).json({ message: 'Usuário não cadastrado.' });
  }

  return res.status(200).json({ message: `Lembrete de senha: ${reminder.reminder}` });
};
