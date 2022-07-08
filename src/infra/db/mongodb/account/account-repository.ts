import { AddAccountRepository } from "../../../../data/protocols/db/account/add-account-repository";
import { LoadAccountByEmailRepository } from "../../../../data/protocols/db/account/load-account-by-email-repository";
import { UpdateAccessTokenRepository } from "../../../../data/protocols/db/account/update-access-token-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(account)
    const accountCreated = await accountCollection.findOne({ email: account.email })

    const { _id, ...accountWithoutId } = accountCreated

    const accountCreatedBody = {
      _id: _id,
      email: accountWithoutId.email,
      name: accountWithoutId.name,
      password: accountWithoutId.password
    }
    return MongoHelper.map(accountCreatedBody)
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })

    if(!account) {
      return null
    }

    const { _id, ...accountWithoutId } = account

    const accountLoadBody = {
      _id: _id,
      email: accountWithoutId.email,
      name: accountWithoutId.name,
      password: accountWithoutId.password
    }

    return MongoHelper.map(accountLoadBody)
  }

  async updateAccessToken(id: string, accessToken: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken
      }
    })
  }
}