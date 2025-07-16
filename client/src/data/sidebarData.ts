import Payment from "@mui/icons-material/Payment"
import AddCard from "@mui/icons-material/AddCard"

import type { SvgIconTypeMap } from "@mui/material/SvgIcon";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export interface SidebarLinks {
  to: string
  text: string
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>
}

export const sidebarLinks: SidebarLinks[] = [
  { to: "/payments", text: "Payments", icon: Payment },
  { to: "/payments/create", text: "Create Payment", icon: AddCard },
];
