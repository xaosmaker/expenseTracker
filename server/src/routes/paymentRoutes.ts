import { Router } from "express";
import { createPaymentHandler } from "../controllers/paymentHandlers.js";
import { createPaymentValidator } from "../validators/paymentValidators.js";

export const paymentRoutes = Router()

paymentRoutes.post("/", createPaymentValidator(), createPaymentHandler)
