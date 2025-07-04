import { DatabaseError } from "pg";
import { CreatePaymentDB, Payment } from "../types/Payment.js";
import { pool } from "./dbPool.js";
import { AppError } from "../errors/AppErrors.js";

export async function createPaymentQuery({ name, payed_due_date, amount, user_id, is_payed }: CreatePaymentDB) {

  try {

    const { rows } = await pool.query("INSERT INTO payments (name, payed_due_date, amount, user_id, is_payed) VALUES ($1,$2,$3,$4,$5) RETURNING *;",
      [name, payed_due_date, amount, user_id, is_payed])
    console.log(rows);
    return new Payment(rows[0])
  } catch (e) {
    if (e instanceof DatabaseError && e.code === "23505") {
      throw new AppError("name and payedDueDate should be unique together", 400)
    }
    console.log(e);
    throw new AppError("Database Error", 500)
  }
}


export async function getPaymentsByUserIdQuery(user_id: number) {
  const { rows } = await pool.query("SELECT * FROM payments where user_id = $1", [user_id])
  const paymentList: Payment[] = []
  for (const row of rows) {
    paymentList.push(new Payment(row))

  }
  return paymentList
}

export async function getPaymentByIDAndUserIdQuery(user_id: number, id: number) {
  const { rows } = await pool.query("SELECT * FROM payments where user_id = $1 AND id = $2", [user_id, id])
  if (rows.length === 1) {
    return new Payment(rows[0])
  }
  return

}

export async function putPaymentByIdQuery(id: number, user_id: number, { payed_due_date, is_payed, name, amount }: CreatePaymentDB) {
  const { rows } = await pool.query("UPDATE payments  SET (payed_due_date, name, amount, is_payed, updated_at) = ($1, $2, $3,$4, CURRENT_TIMESTAMP) WHERE id = $5 AND user_id = $6 RETURNING *;",
    [payed_due_date, name, amount, is_payed, id, user_id])
  if (rows.length === 1) {
    return new Payment(rows[0])
  }
  return
}

export async function deletePaymentByIdQuery(id: number, user_id: number) {
  await pool.query("DELETE FROM payments WHERE id = $1 AND user_id = $2", [id, user_id])
}



