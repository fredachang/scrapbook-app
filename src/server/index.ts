import express from "express";
import cors from "cors";
import { pool } from "./db.ts";
import passport from "passport";
import session from "express-session";
import { Request, Response, NextFunction } from "express";

import { initialisePassport } from "./passportConfig.ts";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
initialisePassport(passport);

app.use(
  session({
    secret: "keyboard-cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//custom middleware to check authentication
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

//Routes

app.post(
  "/auth/signup",
  passport.authenticate("local-signup", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
);

app.post(
  "/auth/login",
  passport.authenticate("local-login", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);

//ROUTES

app.get("/blocks", isAuthenticated, async (req, res) => {
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
