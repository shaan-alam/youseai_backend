import { Request } from "express";

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export type ValidateUserLogin = {
  email: string;
  password: string;
};

export type GenerateTokenParams = {
  userId: string;
};

export interface IRequest<T> extends Request {
  body: T;
}
