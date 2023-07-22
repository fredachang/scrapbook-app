import { Pool } from "pg";

export interface DbUser {
  id: string;
  email: string;
  salt: string;
  password: string;
  firstName: string;
  lastName: string;
  created: Date;
  updated: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  created: Date;
}

export class DatabaseService {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async writeUser(user: Partial<DbUser>): Promise<DbUser> {
    const { rows } = await this.pool.query(
      "INSERT INTO users(email, salt, password, first_name, last_name, created, updated) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING email, salt, password, first_name as firstName, last_name as lastName, created, updated",
      [
        user.email,
        user.salt,
        user.password,
        user.firstName,
        user.lastName,
        user.created,
        user.created,
      ]
    );

    if (rows.length === 0) {
      throw new Error("Error inserting user into database");
    }

    return rows[0];
  }

  async getUserById(userId: number): Promise<DbUser | null> {
    const { rows } = await this.pool.query("SELECT * FROM users WHERE id=$1", [
      userId,
    ]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async getUserByEmail(email: string): Promise<DbUser | null> {
    const { rows } = await this.pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    const user = rows[0];

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      salt: user.salt,
      password: user.password,
      created: user.created,
      updated: user.updated,
    };
  }

  async emailExists(email: string): Promise<boolean> {
    const { rows } = await this.pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    return rows.length > 0;
  }
}
