import { DbAddAccount } from "../../../../data/usecase/add-account/db-add-account";
import { AddAccount } from "../../../../domain/usecases/add-account";
import { BcryptAdapter } from "../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { AccountMongoRepository } from "../../../../infra/db/mongodb/account/account-repository";

export const makeDbAddAccount = (): AddAccount => {
const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository, addAccountRepository)
  return addAccount
}