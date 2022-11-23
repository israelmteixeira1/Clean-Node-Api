import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper"
import request from "supertest";
import app from '../config/app'
import { Collection } from "mongodb";
import { sign } from "jsonwebtoken";
import env from "../config/env"

describe('Survey Routes', () => {
  let surveyCollection: Collection
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      await accountCollection.insertOne({
        name: "Israel",
        email: "israelmteixeira1@gmail.com",
        password: "dev123",
        role: "admin"
      })
      const account = await accountCollection.findOne({ email: "israelmteixeira1@gmail.com" })
      const accessToken = sign({ id: account!._id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: account!._id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }]
        })
        .expect(204)
    })
  })
})