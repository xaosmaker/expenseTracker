import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { Payment } from "../types/paymentTypes";
import { dateToYMD } from "../../../helpers/utils";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"
import { useContext } from "react";
import { DeleteModalContext } from "../../../components/DeleteModal";
import { deletePaymentApi } from "../services/paymentServices";

export default function PaymentTableRow({ id, name, payedDueDate, amount, isPayed, createdAt, updatedAt }: Omit<Payment, "userId">) {
  const deleteModal = useContext(DeleteModalContext)

  function handleDeleteClick() {
    if (deleteModal === undefined) {
      throw new Error("Cand Context be undefined")
    }
    deleteModal({ id, name, text: `amount: ${amount}, created at: ${dateToYMD(createdAt)}`, deleteFunction: deletePaymentApi })
  }

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

    >
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{dateToYMD(payedDueDate)}</TableCell>
      <TableCell align="right">{amount}</TableCell>
      <TableCell align="right">{isPayed ? "Yes" : "No"}</TableCell>
      <TableCell align="right">{dateToYMD(createdAt)}</TableCell>
      <TableCell align="right">{dateToYMD(updatedAt)}</TableCell>
      <TableCell><IconButton onClick={handleDeleteClick}><DeleteIcon /> </IconButton></TableCell>
    </TableRow>
  )
}

