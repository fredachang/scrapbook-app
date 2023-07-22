import { pool } from "./db.ts";
import bcrypt from "bcryptjs";
import { User } from "./types.ts";

export const emailExists = async (email: string): Promise<boolean> => {
  const data = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  return data.rows.length > 0;
};

export const createUser = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<User> => {
  // const salt = await bcrypt.genSalt(10);
  const saltRounds = 10;
  const hash = await bcrypt.hash(data.password, saltRounds);

  const { rows } = await pool.query(
    "INSERT INTO users(email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, password, first_name, last_name",
    [data.email, hash, data.firstName, data.lastName]
  );

  if (rows.length === 0) {
    throw new Error("Error inserting user into database");
  }
  // TODO: we don't want to send user's password back to client
  return rows[0];
};

export const matchPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword);
};

export const getUserById = async (userId: number): Promise<User | null> => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [
    userId,
  ]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};
