import { Router } from "express";
import { createPaymentHandler, deletePaymentWithIdHandler, getAllUserPaymentsHandler, getPaymentByIDHandler, putPaymentByIDHandler } from "../controllers/paymentHandlers.js";
import { createPaymentValidator, putPaymentValidator } from "../validators/paymentValidators.js";

export const paymentRoutes = Router()

paymentRoutes.post("/", createPaymentValidator(), createPaymentHandler)
paymentRoutes.get("/", getAllUserPaymentsHandler)
paymentRoutes.get("/:id", getPaymentByIDHandler)
paymentRoutes.put("/:id", putPaymentValidator(), putPaymentByIDHandler)
paymentRoutes.delete("/:id", deletePaymentWithIdHandler)
