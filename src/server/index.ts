import express from "express";
import cors from "cors";
import { pool } from "./db.ts";
import { DatabaseService } from "./services/database.service.ts";
import { UserService } from "./services/user.service.ts";
import { createJwt } from "./utils.ts";
import { config } from "dotenv";
import { authMiddleware } from "./middleware/auth.middleware.ts";

config();

const app = express();

const databaseService = new DatabaseService(pool);
const userService = new UserService(databaseService);

//middleware
app.use(cors());
app.use(express.json());

app.listen(4000, () => {
  console.log("server has started on port 4000");
});

app.get("/blocks", authMiddleware, async (req, res) => {
  const { rows } = await pool.query("SELECT * from blocks");

  if (rows.length === 0) {
    return res.status(400).json("Something went wrong");
  }

  return res.status(200).json(rows);
});

app.post("/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    await userService.registerUser({
      email,
      password,
      firstName,
      lastName,
    });

    res.status(200).json("Sign up successful");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(`Error registering, ${error.message}`);
    }
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.verifyUserCredentials(email, password);
    const jwt = createJwt({ user }, process.env.AUTH_SECRET!);

    return res.status(200).json(jwt);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(`Error registering, ${error.message}`);
    }
  }
});
