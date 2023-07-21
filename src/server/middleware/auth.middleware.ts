import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("Invalid authorization token");
  }

  const token = authorization.split(" ")[1];

  // TODO: come back and extend express's request type to know about the User
  jwt.verify(token, process.env.AUTH_SECRET!, (err, jwtPayload) => {
    if (err) {
      return res.status(403).json("Unauthorized");
    }

    req.user = jwtPayload.user;
    next();
  });
};
