
import { DbAddAccount } from "@/data/usecase/add-account/db-add-account";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { AccountMongoRepository } from "@/infra/db/mongodb/account-repository/account";
import { LogMongoRepository } from "@/infra/db/mongodb/log-repository/log";
import { LogControllerDecorator } from "@/main/decorators/log";
import { SignUpController } from "@/presentation/controllers/signup/signup";
import { Controller } from "@/presentation/controllers/signup/signup-protocols";
import { makeSignupValidation } from "./signup-validation";

export const makeSignupController = (): Controller => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const signupController = new SignUpController(addAccount, makeSignupValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}