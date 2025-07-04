import { body } from "express-validator";

export function createPaymentValidator() {


  return [
    body("name").notEmpty().withMessage("Required"),
    body("payedDueDate").isDate().withMessage("date, required"),
    body("amount").isNumeric().withMessage("number, required"),
    body("isPayed").isBoolean().withMessage("boolean, required")

  ]
}
export function putPaymentValidator() {
  const validators = createPaymentValidator()
  const valId = body("id").isInt().withMessage("int, required")
  validators.push(valId)
  return validators
}
