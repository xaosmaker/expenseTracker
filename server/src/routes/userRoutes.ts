import { Router } from "express";
import { createUserHandler } from "../controllers/userHandlers.js";
import { createUserValidators } from "../validators/userValidators.js";

export const userRoutes = Router()

userRoutes.post("/", createUserValidators(), createUserHandler)
