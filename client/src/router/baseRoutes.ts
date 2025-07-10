import { createBrowserRouter } from "react-router-dom"
import LoginReg from "../users/routes/LoginReg"
import Payments from "../payments/Payments"
import Layout from "../components/Layout"


export const router = createBrowserRouter([
  { path: "/login", Component: LoginReg },
  { path: "/register", Component: LoginReg },
  { path: "/payments", Component: Payments },
  { path: "/", Component: Layout }

])
