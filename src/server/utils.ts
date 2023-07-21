import crypto from "crypto";
import jwt, { Secret } from "jsonwebtoken";

interface Password {
  salt: string;
  hashedPassword: string;
}

export const createJwt = (
  payload: Parameters<typeof jwt.sign>[0],
  token: Secret
) => {
  return jwt.sign(payload, token, { expiresIn: "10h" });
};

export const createSalt = () => crypto.randomBytes(20).toString("hex");

const hashPassword = (password: string, salt: string): string => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};

export const hashAndSaltUserPassword = (password: string): Password => {
  const salt = createSalt();
  const hashedPassword = hashPassword(password, salt);

  return {
    salt,
    hashedPassword,
  };
};

export const verifyPassword = (
  plainTextPassword: string,
  salt: string,
  hashedPassword: string
): boolean => {
  return hashPassword(plainTextPassword, salt) === hashedPassword;
};
