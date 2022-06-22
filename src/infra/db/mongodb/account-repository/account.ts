import { AddAccountRepository } from "@/data/protocols/db/add-account-repository";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/load-account-by-email-repository";
import { AccountModel } from "@/domain/models/account";
import { AddAccountModel } from "@/domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
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
}