import { LogErrorRepository } from "@/data/protocols/log-error-repository";
import { Controller } from "@/presentation/protocols";
import { DbAddAccount } from "../../data/usecase/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account";
import { SignUpController } from "../../presentation/controllers/signup/signup";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { LogControllerDecorator } from "../decorators/log";

export const makeSignupController = (): Controller => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()
  const signupController = new SignUpController(emailValidator, addAccount)
  const logErrorRepository = new LogErrorRepository()
  return new LogControllerDecorator(signupController)
}