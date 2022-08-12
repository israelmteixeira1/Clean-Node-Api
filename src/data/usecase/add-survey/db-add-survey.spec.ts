import { AddSurveyModel, AddSurveyRepository } from "./db-add-survey-protocols"
import { DbAddSurvey } from './db-add-survey'

const makeFakeSurveyData = (): AddSurveyModel => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }]
})

const makeAddSurveyRepositoryStub = (): AddSurveyRepository => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
        async add(surveyData: AddSurveyModel): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new AddSurveyRepositoryStub()
}

interface SutTypes {
    sut: DbAddSurvey
    addSurveyRepository: AddSurveyRepository
}

const makeSut = (): SutTypes => {
    const addSurveyRepository = makeAddSurveyRepositoryStub()
    const sut = new DbAddSurvey(addSurveyRepository)
    return {
        sut,
        addSurveyRepository
    }
}

describe('DbAddSurvey Usecase', () => {
    test('Should call AddSurveyRepository with correct values', async () => {
        const { addSurveyRepository, sut } = makeSut()
        const addSpy = jest.spyOn(addSurveyRepository, 'add')
        const surveyData = makeFakeSurveyData()
        await sut.add(surveyData)
        expect(addSpy).toHaveBeenCalledWith(surveyData)
    })

    test('Should throw if AddSurveyRepository throws', async () => {
        const { sut, addSurveyRepository } = makeSut()
        jest.spyOn(addSurveyRepository, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.add(makeFakeSurveyData())
        await expect(promise).rejects.toThrow()
      })
})