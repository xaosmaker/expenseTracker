import { Request, Response, NextFunction } from "express";
import { fieldErrorsToJsonResponse } from "../errors/fieldErrorsToJsonResponse.js";
import { CreateUser } from "../types/User.js";
import { AppError } from "../errors/AppErrors.js";
import { createUserQuerie } from "../models/usersDB.js";



export async function createUserHandler(req: Request<{}, {}, CreateUser>, res: Response, _next: NextFunction) {
  fieldErrorsToJsonResponse(req)


  const body: CreateUser = req.body
  if (body.password !== body.confirmPassword) {
    throw new AppError("Password Mismatch", 400)
  }

  const user = await createUserQuerie(body)

  res.status(201).json(user.userWithoutPass())


}
