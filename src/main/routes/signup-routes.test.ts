import { MongoHelper } from "@/infra/db/mongodb/helpers/mongo-helper";
import request from "supertest";
import app from '../config/app'

describe('Should return an account on success', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

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