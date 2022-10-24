import { EmailValidator, Validation } from "../../../../presentation/controllers/login/signup/signup-controller-protocols"
import {   RequiredFieldValidation, ValidationComposite } from "../../../../validation/validators/index"
import { makeAddSurveyValidation } from "./add-survey-validation-factory"

jest.mock('../../../../validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})