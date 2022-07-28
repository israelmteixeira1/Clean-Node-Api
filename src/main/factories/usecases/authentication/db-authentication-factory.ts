
import { DbAuthentication } from "../../../../data/usecase/authentication/db-authentication";
import { BcryptAdapter } from "../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "../../../../infra/criptography/jwt-adapter/jwt-adapter";
import { AccountMongoRepository } from "../../../../infra/db/mongodb/account/account-repository";
import env from "../../../config/env";

export const makeDbAuthentication = (): DbAuthentication => {
    const salt = 12
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    return dbAuthentication
}