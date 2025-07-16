import { createBrowserRouter } from "react-router-dom"
import LoginReg from "../features/users/routes/LoginReg"
import Layout from "../components/Layout"
import PaymentTable from "../features/payments/pages/PaymentTable"
import CreatePayment from "../features/payments/pages/CreatePayment"
import RequireAuth from "../features/authentication/pages/RequireAuth"


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
