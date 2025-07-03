import { Request, Response, NextFunction } from "express";
import { fieldErrorsToJsonResponse } from "../errors/fieldErrorsToJsonResponse.js";
import { CreateUser, RawUser, User } from "../types/User.js";
import { AppError } from "../errors/AppErrors.js";
import { createUserQuerie, getUserByEmailQuerie } from "../models/usersDB.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../settings.js";



export async function createUserHandler(req: Request<{}, {}, CreateUser>, res: Response, _next: NextFunction) {
  fieldErrorsToJsonResponse(req)


  const body: CreateUser = req.body
  if (body.password !== body.confirmPassword) {
    throw new AppError("Password Mismatch", 400)
  }

  const user = await createUserQuerie(body)

  res.status(201).json(user.userWithoutPass())


}

export async function loginUserHandler(req: Request<{}, {}, Omit<RawUser, "id">>, res: Response, _next: NextFunction) {
  const err = new AppError("Email or password is invalid", 400)


  const email = req?.body?.email
  const pass = req?.body?.password


  if (!email || !pass) {
    throw err
  }

  const user = await getUserByEmailQuerie(email)

  if (!user) {
    throw err
  }
  const isValid = await bcrypt.compare(pass, user.password)

  if (!isValid) {
    throw err
  }

  //TODO: add hours to settings
  const jwt_key = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '8h' })

  res.cookie("jwt-key", jwt_key, { maxAge: 3600 * 1000 * 8, httpOnly: true, secure: true, sameSite: "strict" })
  res.json({ message: "succesfully login" })

}

export async function getUserWithIdHandler(req: Request, res: Response, _next: NextFunction) {
  if (req.user instanceof User) {
    res.json(req.user.userWithoutPass())
    return
  }
  throw new AppError("Unauthorized", 401)
}
