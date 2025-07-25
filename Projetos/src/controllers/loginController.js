exports.passwordReminder = (req, res) => {
  const { email, senha } = req.body; // 👈 Aqui
  const result = loginService.login(email, senha);

  if (result.status === 'success') {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
    });
  } else if (result.status === 'blocked') {
    return res.status(403).json({ message: 'Usuário bloqueado por tentativas inválidas.' });
  } else if (result.status === 'not_found') {
    return res.status(404).json({ message: 'Usuário não cadastrado.' });
  } else {
    return res.status(401).json({ message: 'Login ou senha inválidos.' });
  }
};
