import { Response, Request, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../settings.js"
import { getUserWithIdQuerie } from "../models/usersDB.js"

// the user is Anonymous except when ver and validated
export async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const cookies = req.headers.cookie?.split(";").map(cook => cook.trim())
  const cookie = cookies?.find((cook) => cook.split("=")[0] === "jwt-key")
  const jwtKey = cookie?.split("=")[1]
  req.user = { email: "Anonymous" }
  if (jwtKey) {

    try {
      const ver = jwt.verify(jwtKey, JWT_SECRET)

      if (typeof ver === "object") {
        const id = Number(ver["id"])
        const user = await getUserWithIdQuerie(id)
        if (user) {
          req.user = user
        }
      }
    } catch {

    }




  }

  next()

}
