import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../../common/types";

config();

const emptyUser = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  created: new Date(),
};

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

  jwt.verify(token, process.env.AUTH_SECRET!, (err, jwtPayload) => {
    if (err) {
      return res.status(403).json("Unauthorized");
    }

    req.user =
      typeof jwtPayload !== "string"
        ? (jwtPayload?.user as unknown as User)
        : emptyUser;
    next();
  });
};
