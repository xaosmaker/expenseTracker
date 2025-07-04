import { Request, Response, NextFunction } from "express";
import { CreatePayment, CreatePaymentDB } from "../types/Payment.js";
import { fieldErrorsToJsonResponse } from "../errors/fieldErrorsToJsonResponse.js";
import { User } from "../types/User.js";
import { AppError } from "../errors/AppErrors.js";
import { createPaymentQuery, getPaymentsByUserIdQuery } from "../models/paymentsDB.js";


export async function createPaymentHandler(req: Request<{}, {}, CreatePayment>, res: Response, _next: NextFunction) {
  fieldErrorsToJsonResponse(req)
  if (!(req.user instanceof User)) {
    throw new AppError("Unauthorized", 401)
  }
  const body: CreatePayment = req.body
  const bodyDB: CreatePaymentDB = { name: body.name, is_payed: body.isPayed, payed_due_date: body.payedDueDate, amount: body.amount, user_id: req.user.id }
  const payment = await createPaymentQuery(bodyDB)

  res.status(201).json(payment)
}

export async function getAllUserPaymentsHandler(req: Request, res: Response, _next: NextFunction) {
  if (!(req.user instanceof User)) {
    throw new AppError("Unauthorized", 401)
  }

  const payments = await getPaymentsByUserIdQuery(req.user.id)
  res.json(payments)



}
