import { Request } from "express"
import { FieldValidationError, validationResult } from "express-validator";
import { AppError } from "./AppErrors.js";

export interface FieldErrors {
  field: string
  message: string
}

export function fieldErrorsToJsonResponse(req: Request<any>) {
  const errors = validationResult(req)
  const errorArr: FieldErrors[] = errors.array().map((e) => {
    e = e as FieldValidationError
    return { field: e.path, message: e.msg }
  })
  if (errorArr.length > 0) {


    throw new AppError(errorArr, 400)
  }



}

