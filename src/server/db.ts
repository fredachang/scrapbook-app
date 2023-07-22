import pg from "pg";

const { Pool } = pg;

//connects to server
export const pool = new Pool({
  user: "postgres",
  password: "winter",
  host: "localhost",
  database: "Arena",
  port: 5432,
});
