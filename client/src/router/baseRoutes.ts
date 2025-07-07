import { createBrowserRouter } from "react-router-dom"
import LoginReg from "../components/LoginReg"


export const router = createBrowserRouter([
  { path: "/login", Component: LoginReg },
  { path: "/register", Component: LoginReg }
])
