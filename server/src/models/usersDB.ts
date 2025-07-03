import { DatabaseError } from "pg";
import { CreateUser, User } from "../types/User.js";
import { pool } from "./dbPool.js";
import { AppError } from "../errors/AppErrors.js";

export async function createUserQuerie({ email, password }: Omit<CreateUser, 'confirmPassword'>) {
  //TODO: implement cryptographic password here

  try {

    const { rows } = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [email, password])
    const user = new User(rows[0])
    return user

  } catch (e) {

    if (e instanceof DatabaseError && e.code === '23505') {
      throw new AppError("Email Already Exists", 400)
    }

    console.log(e);
    throw new AppError("Database Error", 500)

  }
}
