import { Router } from "express";
import { createPaymentHandler, getAllUserPaymentsHandler } from "../controllers/paymentHandlers.js";
import { createPaymentValidator } from "../validators/paymentValidators.js";

export const paymentRoutes = Router()

paymentRoutes.post("/", createPaymentValidator(), createPaymentHandler)
paymentRoutes.get("/", getAllUserPaymentsHandler)
