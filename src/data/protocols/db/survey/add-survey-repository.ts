import { AddAccountModel } from "../../../usecase/add-account/db-add-account-protocols";
import { AddSurveyModel } from "../../../usecase/add-survey/db-add-survey-protocols";

export interface AddSurveyRepository {
    add(accountData: AddSurveyModel): Promise<void>
}