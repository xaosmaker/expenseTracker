import { createBrowserRouter } from "react-router-dom"
import LoginReg from "../users/routes/LoginReg"
import Layout from "../components/Layout"
import PaymentTable from "../payments/pages/PaymentTable"
import CreatePayment from "../payments/pages/CreatePayment"
import { DeleteModal } from "../components/DeleteModal"
import RequireAuth from "../authentication/pages/RequireAuth"


export const router = createBrowserRouter([
  { path: "/login", Component: LoginReg },
  { path: "/register", Component: LoginReg },
  { path: "/deleteModal", Component: DeleteModal },
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
