
import { DbAddAccount } from "@/data/usecase/add-account/db-add-account";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { AccountMongoRepository } from "@/infra/db/mongodb/account/account-repository";
import { LogMongoRepository } from "@/infra/db/mongodb/log/log-mongo-repository";
import { LogControllerDecorator } from "@/main/decorators/log-controller-decorator";
import { SignUpController } from "@/presentation/controllers/signup/signup-controller";
import { Controller } from "@/presentation/controllers/signup/signup-controller-protocols";
import { makeSignupValidation } from "./signup-validation-factory";

export const makeSignupController = (): Controller => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const signupController = new SignUpController(addAccount, makeSignupValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}