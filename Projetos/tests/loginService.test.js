const loginService = require('../src/services/loginService');
const { expect } = require('chai');

describe('loginService', () => {
  beforeEach(() => {
    // Resetar tentativas e bloqueio dos usuários antes de cada teste
    const users = require('../src/services/users').users;
    users.forEach(u => {
      u.attempts = 0;
      u.blocked = false;
    });
  });

  it('deve realizar login com sucesso', () => {
    const result = loginService.login('joao@example.com', '1234');
    expect(result.status).to.equal('success');
    expect(result).to.have.property('token');
  });

  it('deve retornar inválido para senha errada', () => {
    const result = loginService.login('joao@example.com', 'errada');
    expect(result.status).to.equal('invalid');
  });

  it('deve bloquear após 3 tentativas inválidas', () => {
    loginService.login('joao@example.com', 'x');
    loginService.login('joao@example.com', 'y');
    const terceiro = loginService.login('joao@example.com', 'z');
    expect(terceiro.status).to.equal('blocked');
    // Tentativa após bloqueio
    const depois = loginService.login('joao@example.com', '1234');
    expect(depois.status).to.equal('blocked');
  });

  it('deve retornar lembrete de senha', () => {
    const result = loginService.passwordReminder('joao@example.com');
    expect(result.status).to.equal('success');
    expect(result.reminder).to.equal('Seu número favorito');
  });

  it('deve retornar not_found para usuário inexistente', () => {
    const result = loginService.login('naoexiste@example.com', 'qualquer');
    expect(result.status).to.equal('not_found');
    const reminder = loginService.passwordReminder('naoexiste@example.com');
    expect(reminder.status).to.equal('not_found');
  });
});
