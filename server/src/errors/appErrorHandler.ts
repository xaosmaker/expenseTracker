import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppErros.js";




export function appErrorHandler(err: AppError, req: Request, res: Response, _next: NextFunction) {

  if (err instanceof AppError) {
    res.status(err.statusCode).json(err)
    return

  }
  console.log("other error", err);
  console.log("req", req);

  const generic = new AppError("Something Went Wrong", 500)

  res.status(generic.statusCode).json(generic)

}
