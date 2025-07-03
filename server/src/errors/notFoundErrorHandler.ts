import { Response, Request, NextFunction } from "express";
import { AppError } from "./AppErrors.js";

export function notFoundErrorHandler(_req: Request, _res: Response, _next: NextFunction) {
  throw new AppError("Page Not Found", 404)
}
