import { LogErrorRepository } from "@/data/protocols/log-error-repository"
import { serverError } from "@/presentation/helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols"
import { resolve } from "path"
import { LogControllerDecorator } from "./log"

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Rodrigo'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  const controllerStub = new ControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerStub } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    console.log(httpResponse)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Rodrigo'
      }
    })
  })

  test('Should call LogErrorRepository with correct error if controller retuns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))
    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})