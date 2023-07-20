import { pool } from "./db.ts";
import bcrypt from "bcryptjs";

export const emailExists = async (email: string) => {
  const data = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  if (data.rowCount == 0) return false;
  return data.rows[0];
};

export const createUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const data = await pool.query(
    "INSERT INTO users(email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, password, first_name, last_name",
    [email, hash, firstName, lastName]
  );

  if (data.rowCount === 0) return false;
  // don't send password back to the client from the client
  return data.rows[0];
};

export const matchPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword);
};

export const getUserById = async (userId: number) => {
  const data = await pool.query("SELECT * FROM users WHERE id=$1", [userId]);

  if (data.rowCount === 0) return null;
  return data.rows[0];
};
