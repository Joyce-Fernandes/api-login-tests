const request = require('supertest');
const app = require('../app');

describe('Testes da API de Login', () => {
  it('POST /login deve retornar 200 com mensagem de sucesso', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', senha: '123456' })
      .expect(200)
      .expect(res => {
        if (!res.body.message.includes('sucesso')) {
          throw new Error('Mensagem de sucesso não retornada');
        }
      })
      .end(done);
  });

  it('POST /login com credenciais inválidas deve retornar 401', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', senha: 'errada' })
      .expect(401)
      .expect(res => {
        if (!res.body.message.includes('inválidos')) {
          throw new Error('Mensagem de erro incorreta');
        }
      })
      .end(done);
  });

  it('POST /login com email inexistente deve retornar 404', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'naoexiste@email.com', senha: '123456' })
      .expect(404)
      .expect(res => {
        if (!res.body.message.includes('não cadastrado')) {
          throw new Error('Mensagem de usuário não encontrado incorreta');
        }
      })
      .end(done);
  });

  it('POST /login/reminder deve retornar lembrete de senha', (done) => {
    request(app)
      .post('/login/reminder')
      .send({ email: 'admin@admin.com' })
      .expect(200)
      .expect(res => {
        if (!res.body.message.includes('Lembrete de senha')) {
          throw new Error('Mensagem de lembrete incorreta');
        }
      })
      .end(done);
  });

  it('POST /login/reminder com email inexistente deve retornar 404', (done) => {
    request(app)
      .post('/login/reminder')
      .send({ email: 'naoexiste@email.com' })
      .expect(404)
      .expect(res => {
        if (!res.body.message.includes('não cadastrado')) {
          throw new Error('Mensagem incorreta para lembrete de usuário inexistente');
        }
      })
      .end(done);
  });
});
