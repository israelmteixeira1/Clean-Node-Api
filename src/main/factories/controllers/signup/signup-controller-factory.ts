import { SignUpController } from "../../../../presentation/controllers/login/signup/signup-controller";
import { Controller } from "../../../../presentation/controllers/login/signup/signup-controller-protocols";
import { makeSignupValidation } from "./signup-validation-factory";
import { makeDbAuthentication } from "../../usecases/authentication/db-authentication-factory";
import { makeDbAddAccount } from "../../usecases/add-account/db-add-account-factory";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";

export const makeSignupController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}