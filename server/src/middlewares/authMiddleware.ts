import { Response, Request, NextFunction } from "express"

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(1, req.cookies);

  console.log(req.method, res.statusCode);


  next()

}
