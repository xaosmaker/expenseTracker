import express from "express"
import { PORT } from "./settings.js"
import { appErrorHandler } from "./errors/appErrorHandler.js"
import { notFoundErrorHandler } from "./errors/notFoundErrorHandler.js"
import { User } from "./types/User.js"

const server = express()









server.get("/", (_req, res, _next) => {
  const date = new Date()
  const user = new User({ id: 1, email: "somemail ", password: "1234", created_at: date, updated_at: date })
  res.json(user.userWithoutPass())
})





//errors
server.use(notFoundErrorHandler)
server.use(appErrorHandler)

//listen
server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})






