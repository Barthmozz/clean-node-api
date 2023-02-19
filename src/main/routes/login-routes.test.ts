import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return status 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Joe',
          email: 'joe@mail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return status 200 on login', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'Joe',
        email: 'joe@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'joe@mail.com',
          password: '123456'
        })
        .expect(200)
    })

    test('Should return status 401 if invalid credentials are provided', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'joe@mail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
