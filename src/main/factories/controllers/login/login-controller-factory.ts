import { LogMongoRepository } from "../../../../infra/db/mongodb/log/log-mongo-repository";
import { LogControllerDecorator } from "../../../decorators/log-controller-decorator";
import { LoginController } from "../../../../presentation/controllers/login/login/login-controller";
import { Controller } from "../../../../presentation/protocols";
import { makeLoginValidation } from "./login-validation-factory";
import { makeDbAuthentication } from "../../usecases/authentication/db-authentication-factory";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";

export const makeLoginController = (): Controller => {
    const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
    return makeLogControllerDecorator(controller)
}