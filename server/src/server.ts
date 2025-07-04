import express from "express"
import { PORT } from "./settings.js"
import { appErrorHandler } from "./errors/appErrorHandler.js"
import { notFoundErrorHandler } from "./errors/notFoundErrorHandler.js"
import { userRoutes } from "./routes/userRoutes.js"
import { authMiddleware } from "./middlewares/authMiddleware.js"
import { isAuthenticatedMiddleware } from "./middlewares/isAuthenticatedMiddleware.js"
import { paymentRoutes } from "./routes/paymentRoutes.js"

const server = express()


server.use(express.json())

server.use(authMiddleware)


server.use("/api/users", userRoutes)
server.use("/api/payments", isAuthenticatedMiddleware, paymentRoutes)



//errors
server.use(notFoundErrorHandler)
server.use(appErrorHandler)

//listen
server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})






