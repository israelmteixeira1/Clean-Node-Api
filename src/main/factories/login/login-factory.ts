import { DbAuthentication } from "@/data/usecase/authentication/db-authentication";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/jwt-adapter";
import { AccountMongoRepository } from "@/infra/db/mongodb/account/account-repository";
import { LogMongoRepository } from "@/infra/db/mongodb/log/log-mongo-repository";
import env from "@/main/config/env";
import { LogControllerDecorator } from "@/main/decorators/log-controller-decorator";
import { LoginController } from "@/presentation/controllers/login/login-controller";
import { Controller } from "@/presentation/protocols";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLoginController = (): Controller => {
    const salt = 12
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    const loginController = new LoginController(dbAuthentication, makeLoginValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongoRepository)
}