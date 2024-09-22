import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as authServices from "../services/auth.service";
import User from "../models/user.model";
import { IRequest } from "../types";

export const register = async (
  req: IRequest<{ name: string; email: string; password: string }>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).select("-password");
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const { user, token } = await authServices.createUser({
      name,
      email,
      password,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.json({ user, token });
  } catch (err: unknown) {
    res.status(500).json({ message: "Something went wrong", err });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const { error, status_code, token, user } =
      await authServices.validateUserLogin({ email, password });
    if (error) {
      return res.status(status_code).json({ message: error });
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.json({ user, token });
  } catch (err: unknown) {
    res.status(500).json({ message: "Something went wrong", err });
  }
};

export const getCurrentProfile = async (
  req: Request & { user: { userId: string } },
  res: Response
) => {
  try {
    const userId = req.user.userId;
    const user = await User.find({ _id: userId }).select("-password");
    return res.json({ user: user[0] });
  } catch (err: unknown) {
    res.status(500).json({ message: "Something went wrong!", err });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Logged out!" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong!", err });
  }
};
