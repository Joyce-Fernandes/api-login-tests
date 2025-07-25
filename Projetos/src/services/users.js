const users = [
  { email: 'joao@example.com', password: '1234', reminder: 'Seu número favorito', attempts: 0, blocked: false },
  { email: 'maria@example.com', password: 'abcd', reminder: 'Nome do seu pet', attempts: 0, blocked: false }
];

function findUser(email) {
  return users.find(u => u.email === email);
}

function resetUsers() {
  users.forEach(u => { u.attempts = 0; u.blocked = false; });
}

module.exports = {
  users,
  findUser,
  resetUsers
}; 