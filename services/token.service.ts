import jwt from "jsonwebtoken";
import env from "../env";
import { GenerateTokenParams } from "../types";

export const generateToken = async ({ userId }: GenerateTokenParams) => {
  const token = await jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
