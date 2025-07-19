import { createBrowserRouter } from "react-router-dom"
import LoginReg from "../features/users/routes/LoginReg"
import Layout from "../components/Layout"
import PaymentTable from "../features/payments/pages/PaymentTable"
import CreatePayment from "../features/payments/pages/CreatePayment"
import RequireAuth from "../features/authentication/pages/RequireAuth"
import { Navigate } from "react-router-dom"
import UserMe from "../features/users/pages/UserMe"


export const router = createBrowserRouter([
  { path: "/login", Component: LoginReg },
  { path: "/register", Component: LoginReg },
  {
    Component: RequireAuth, children: [
      {
        path: "/", Component: Layout, children: [
          { index: true, Component: () => Navigate({ to: "/payments" }) },
          { path: "/payments", Component: PaymentTable },
          { path: "/payments/create", Component: CreatePayment },
          { path: "/payments/update/:paymentId", Component: CreatePayment },
          { path: "/me", Component: UserMe },

        ]
      },

    ]
  }


])
