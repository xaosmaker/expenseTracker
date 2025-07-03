import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppErrors.js";
export function isAuthenticatedMiddleware(req: Request, _res: Response, next: NextFunction) {

  if (req.user.email === "Anonymous") {
    throw new AppError("Unauthorized Login to Continue", 401)
  }


  next()

}
