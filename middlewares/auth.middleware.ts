import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../env";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export const verifyUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["token"]; // assuming the cookie name is 'auth-token'

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    const secret = env.JWT_SECRET;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};
