import { Router } from "express";
import { createUserHandler, getUserWithIdHandler, loginUserHandler } from "../controllers/userHandlers.js";
import { createUserValidators } from "../validators/userValidators.js";
import { isAuthenticatedMiddleware } from "../middlewares/isAuthenticatedMiddleware.js";

export const userRoutes = Router()

userRoutes.post("/", createUserValidators(), createUserHandler)
userRoutes.post("/login", loginUserHandler)


userRoutes.use(isAuthenticatedMiddleware)


userRoutes.get("/me", getUserWithIdHandler)
