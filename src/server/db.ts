import pg from "pg";
import { config } from "dotenv";

config();

const { Pool } = pg;

//connects to server
export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
