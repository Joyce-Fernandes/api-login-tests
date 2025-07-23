const { expect } = require('chai');
const loginService = require('../src/services/loginService');

describe('loginService', () => {
  beforeEach(() => {
    loginService._resetUsers();
  });

  it('deve realizar login com sucesso', () => {
    const result = loginService.login('admin@admin.com', '123456');
    expect(result.status).to.equal('success');
  });

  it('deve retornar inválido para senha errada', () => {
    const result = loginService.login('admin@admin.com', 'senhaErrada');
    expect(result.status).to.equal('invalid');
  });

  it('deve bloquear após 3 tentativas inválidas', () => {
    loginService.login('admin@admin.com', 'errada1');
    loginService.login('admin@admin.com', 'errada2');
    const result = loginService.login('admin@admin.com', 'errada3');
    expect(result.status).to.equal('blocked');
  });

  it('deve retornar lembrete de senha', () => {
    const result = loginService.passwordReminder('admin@admin.com');
    expect(result.status).to.equal('success');
    expect(result.reminder).to.be.a('string');
  });

  it('deve retornar not_found para usuário inexistente', () => {
    const result = loginService.login('naoexiste@email.com', '123');
    expect(result.status).to.equal('not_found');
  });
});
s