import { InvalidParamError } from "../../../presentation/errors"
import { CompareFieldsValidation } from "./compare-fields-validation"

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fielToCompare')
}

describe('RequiredField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fielToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fielToCompare'))
  })

  test('Should not return if validation suceeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', fielToCompare: 'any_name' })
    expect(error).toBeFalsy()
  })
})