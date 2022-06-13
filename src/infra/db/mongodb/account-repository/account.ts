import { AddAccountRepository } from "@/data/protocols/db/add-account-repository";
import { AccountModel } from "@/domain/models/account";
import { AddAccountModel } from "@/domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
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
}