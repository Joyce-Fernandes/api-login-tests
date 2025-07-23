const users = [
  {
    email: 'admin@admin.com',
    password: '123456',
    reminder: 'Seu número favorito',
    attempts: 0,
    blocked: false
  },
  {
    email: 'maria@email.com',
    password: 'abcd',
    reminder: 'Nome do seu pet',
    attempts: 0,
    blocked: false
  }
];

function findUser(email) {
  return users.find(u => u.email === email);
}

exports.login = (email, password) => {
  const user = findUser(email);
  if (!user) return { status: 'not_found' };
  if (user.blocked) return { status: 'blocked' };

  if (user.password === password) {
    user.attempts = 0;
    return { status: 'success' };
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

exports._resetUsers = () => {
  users.forEach(u => {
    u.attempts = 0;
    u.blocked = false;
  });
};
