import { Collection } from "mongodb"
import { MongoHelper } from "../helpers/mongo-helper"
import { AccountMongoRepository } from "./account-repository"

describe('Account Mongo Repository', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository
  }

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passwoard'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_passwoard')
  })

  test('Should return an account on loadByEmail  success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passwoard'
    })
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_passwoard')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeFalsy()
  })

  // test('Should update the account accessToken on updateAccessToken success', async () => {
  //   const sut = makeSut()
  //   await accountCollection.insertOne({
  //     name: 'any_name',
  //     email: 'any_email@mail.com',
  //     password: 'any_passwoard'
  //   })

  //   const createdAccount = await accountCollection.findOne({email: 'any_email@mail.com'})
  //   expect(createdAccount!.accessToken).toBeFalsy()

  //   await sut.updateAccessToken(createdAccount!._id.toString(), 'any_token')
  //   const account = await accountCollection.findOne({email: 'any_email@mail.com'})
  //   expect(account).toBeTruthy()
  //   expect(account!.accessToken).toBe('any_token')
  // })

  test('Should return an account on loadByToken without role', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passwoard',
      accessToken: 'any_token'
    })

    const account = await sut.loadByToken('any_token')
    expect(account).toBeTruthy()
    expect(account!.id).toBeTruthy()
    expect(account!.name).toBe('any_name')
    expect(account!.email).toBe('any_email@mail.com')
    expect(account!.password).toBe('any_passwoard')
  })

  test('Should return an account on loadByToken with role', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passwoard',
      accessToken: 'any_token',
      role: 'any_role'
    })

    const account = await sut.loadByToken('any_token', 'any_role')
    expect(account).toBeTruthy()
    expect(account!.id).toBeTruthy()
    expect(account!.name).toBe('any_name')
    expect(account!.email).toBe('any_email@mail.com')
    expect(account!.password).toBe('any_passwoard')
  })
})