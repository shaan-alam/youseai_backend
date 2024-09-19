import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { CreateUserParams, ValidateUserLogin } from "../types";
import { generateToken } from "./token.service";

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  const newUser = new User({ name, email, password });
  await newUser.save();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...user } = newUser;

  const token = await generateToken({ userId: `${newUser._id}` });
  return { user, token };
};

export const validateUserLogin = async ({
  email,
  password,
}: ValidateUserLogin) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      user: null,
      token: null,
      error: "User doesn't exists",
      status_code: 404,
    };
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return {
      user: null,
      token: null,
      error: "Invalid Credentials",
      status_code: 400,
    };
  }

  const token = await generateToken({ userId: `${user._id}` });
  return { user, token, error: null, status_code: 200 };
};
