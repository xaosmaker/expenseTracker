import { Request, Response, NextFunction } from "express";
import { CreatePayment, CreatePaymentDB, PutPayment } from "../types/Payment.js";
import { fieldErrorsToJsonResponse } from "../errors/fieldErrorsToJsonResponse.js";
import { User } from "../types/User.js";
import { AppError } from "../errors/AppErrors.js";
import { createPaymentQuery, deletePaymentByIdQuery, getAllPaymentsCountQuery, getPaymentByIDAndUserIdQuery, getPaymentsByUserIdQuery, putPaymentByIdQuery } from "../models/paymentsDB.js";


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

export async function getAllUserPaymentsHandler(req: Request<{}, {}, {}, { page: string, rows: string }>, res: Response, _next: NextFunction) {
  if (!req.query.page || isNaN(Number(req.query.page))) {
    throw new AppError("Param 'page' must be a number", 400)
  }

  if (!req.query.rows || isNaN(Number(req.query.rows))) {
    throw new AppError("Param 'rows' must be a number", 400)
  }

  const page = Number(req.query.page)
  const rows = Number(req.query.rows)



  if (!(req.user instanceof User)) {
    throw new AppError("Unauthorized", 401)
  }

  const payments = await getPaymentsByUserIdQuery(req.user.id, rows, page)
  const allPayments = await getAllPaymentsCountQuery(req.user.id)
  const maxResults = allPayments["all_payments"]

  res.json({ maxResults, payments })
}

export async function getPaymentByIDHandler(req: Request<{ id: number }>, res: Response, _next: NextFunction) {
  if (!(req.user instanceof User)) {
    throw new AppError("Unauthorized", 401)
  }

  const id = Number(req.params.id)
  if (isNaN(id) && !Number.isInteger(id)) {
    throw new AppError("Id should be an Integer", 400)
  }

  const payment = await getPaymentByIDAndUserIdQuery(req.user.id, id)
  if (payment) {
    res.json(payment)
    return
  }
  throw new AppError("Payment with this id does not exist", 400)

}

export async function putPaymentByIDHandler(req: Request<{ id: number }, {}, PutPayment>, res: Response, _next: NextFunction) {
  fieldErrorsToJsonResponse(req)

  if (!(req.user instanceof User)) {
    throw new AppError("Unauthorized", 401)
  }

  const id = Number(req.params.id)
  if (isNaN(id) && !Number.isInteger(id)) {
    throw new AppError("Id should be an Integer", 400)
  }
  const body = req.body
  if (id !== body.id) {
    throw new AppError("id missmuch", 400)
  }

  const bodyDB: CreatePaymentDB = { name: body.name, is_payed: body.isPayed, payed_due_date: body.payedDueDate, amount: body.amount, user_id: req.user.id }
  const payment = await putPaymentByIdQuery(id, req.user.id, bodyDB)
  if (payment) {
    res.json(payment)
    return
  }
  throw new AppError("Something went wrond Updating the payment", 400)
}


export async function deletePaymentWithIdHandler(req: Request<{ id: number }>, res: Response, _next: NextFunction) {

  if (!(req.user instanceof User)) {
    throw new AppError("Unauthorized", 401)
  }

  const id = Number(req.params.id)
  if (isNaN(id) && !Number.isInteger(id)) {
    throw new AppError("Id should be an Integer", 400)
  }
  const payment = await getPaymentByIDAndUserIdQuery(req.user.id, id)
  if (!payment) {
    throw new AppError("This Payment does not exist", 400)
  }
  await deletePaymentByIdQuery(id, req.user.id)
  res.status(204).json()
}






