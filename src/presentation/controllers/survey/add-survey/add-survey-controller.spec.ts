import { HttpRequest, HttpResponse, Validation } from "./add-survey-controller-protocols";
import { AddSurveyController } from './add-survey-controller'

describe('AddSurvey Controller', () => {
    const makeFakeRequest = (): HttpRequest => ({
        body: {
            questiion: 'any_question',
            answers: [{
                image: 'any_image',
                answer: 'any_answer'
            }]
        }
    })

    const makeValidationStub = (): Validation => {
        class ValidationStub implements Validation {
            validate(input: any): Error {
                return null
            }
        }
        return new ValidationStub()
    }

    interface SutTypes {
        sut: AddSurveyController,
        validationStub: Validation
    }

    const makeSut = (): SutTypes => {
        const validationStub = makeValidationStub()
        const sut = new AddSurveyController(validationStub)
        return {
            sut,
            validationStub
        }
    }

    test('Should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut() 
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
})