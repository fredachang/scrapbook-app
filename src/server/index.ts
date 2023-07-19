import express from "express";
const app = express();
import cors from "cors";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "winter",
  host: "localhost",
  database: "Arena",
  port: 5432,
});

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.get("/blocks", async (req, res) => {
  try {
    const allBlocks = await pool.query("SELECT * FROM blocks");
    res.json(allBlocks.rows);
    console.log(allBlocks.rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => {
  console.log("server has started on port 4000");
});
