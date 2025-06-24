import express from "express"
import { PORT } from "./settings.js"

const server = express()









server.get("/", (_req, res, _next) => {
  res.json({ message: "Hello" })
})










server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})






