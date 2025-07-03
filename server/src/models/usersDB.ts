import { DatabaseError } from "pg";
import { CreateUser, User } from "../types/User.js";
import { pool } from "./dbPool.js";
import { AppError } from "../errors/AppErrors.js";
import bcrypt from "bcrypt"

export async function createUserQuerie({ email, password }: Omit<CreateUser, 'confirmPassword'>) {

  const hashPass = await bcrypt.hash(password, 15)
  try {

    const { rows } = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [email, hashPass])
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

export async function getUserByEmailQuerie(email: string) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1;", [email])
  if (rows.length === 1) {
    return new User(rows[0])
  }
  return
}

export async function getUserWithIdQuerie(id: number) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1;", [id])
  if (rows.length === 1) {
    return new User(rows[0])
  }
  return
}
