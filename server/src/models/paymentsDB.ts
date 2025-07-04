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
