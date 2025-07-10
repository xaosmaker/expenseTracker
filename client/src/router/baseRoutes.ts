import { createBrowserRouter } from "react-router-dom"
import LoginReg from "../users/routes/LoginReg"
import Layout from "../components/Layout"
import PaymentTable from "../payments/routes/PaymentTable"


export const router = createBrowserRouter([
  { path: "/login", Component: LoginReg },
  { path: "/register", Component: LoginReg },
  {
    path: "/", Component: Layout, children: [
      { path: "/payments", Component: PaymentTable },

    ]
  },


])
