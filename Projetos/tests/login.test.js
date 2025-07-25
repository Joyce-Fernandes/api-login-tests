const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Testes da API de Login', () => {
  it('POST /login deve retornar 200 com mensagem de sucesso', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'joao@example.com', password: '1234' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('token');
  });

  it('POST /login com credenciais inválidas deve retornar 401', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'joao@example.com', password: 'errada' });
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('status', 'invalid');
  });

  it('POST /login com email inexistente deve retornar 404', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'naoexiste@example.com', password: '1234' });
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('status', 'not_found');
  });

  it('POST /login/reminder deve retornar lembrete de senha', async () => {
    const res = await request(app)
      .post('/login/reminder')
      .send({ email: 'joao@example.com' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('reminder');
  });

  it('POST /login/reminder com email inexistente deve retornar 404', async () => {
    const res = await request(app)
      .post('/login/reminder')
      .send({ email: 'naoexiste@example.com' });
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('status', 'not_found');
  });
});
