import { AccountModel } from "../../../usecase/add-account/db-add-account-protocols";


export interface LoadAccountByTokenRepository{
    loadByToken (account: string, role?: string): Promise<AccountModel| null>
}