import { InvalidParamError } from "../../../presentation/errors";
import { Validation } from "../../protocols/validation";

export class CompareFieldsValidation implements Validation {
  private readonly fieldName
  private readonly fieldToCompareName

  constructor(fieldName: string, fieldToCompareName: string) {
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate(input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}