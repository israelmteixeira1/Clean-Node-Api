import request from "supertest";
import app from '../config/app'

describe('Should return an account on success', () => {
  test('Should enable CORS', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Israel',
        email: 'israel@accon.com.br',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})