import { FieldErrors } from "./fieldErrorsToJsonResponse.js"

export class AppError {
  message: string | FieldErrors[]
  statusCode: number

  constructor(message: string | FieldErrors[], statusCode: number) {
    this.message = message
    this.statusCode = statusCode
  }
}
