import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

export interface IErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: any;
  stack?: string;
}

export type ErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
