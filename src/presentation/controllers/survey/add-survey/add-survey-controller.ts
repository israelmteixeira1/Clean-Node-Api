import { badRequest } from "../../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "./add-survey-controller-protocols";

export class AddSurveyController implements Controller {
    constructor(
        private validation: Validation
    ) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = await this.validation.validate(httpRequest.body)
        if(error) {
            return badRequest(error)
        }
        return new Promise(resolve => resolve(null))
    }
}