import { Router } from "express";
import { createUserHandler, getUserWithIdHandler, loginUserHandler } from "../controllers/userHandlers.js";
import { createUserValidators } from "../validators/userValidators.js";

export const userRoutes = Router()

userRoutes.post("/", createUserValidators(), createUserHandler)
userRoutes.post("/login", loginUserHandler)
userRoutes.get("/me", getUserWithIdHandler)
