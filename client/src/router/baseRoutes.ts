import { createBrowserRouter } from "react-router-dom"
import LoginReg from "../users/routes/LoginReg"
import Layout from "../components/Layout"
import PaymentTable from "../payments/pages/PaymentTable"
import RequireAuth from "../auth/routes/RequireAuth"
import CreatePayment from "../payments/pages/CreatePayment"


export const router = createBrowserRouter([
  { path: "/login", Component: LoginReg },
  { path: "/register", Component: LoginReg },
  {
    Component: RequireAuth, children: [
      {
        path: "/", Component: Layout, children: [
          { path: "/payments", Component: PaymentTable },
          { path: "/payments/create", Component: CreatePayment },

        ]
      },

    ]
  }


])
