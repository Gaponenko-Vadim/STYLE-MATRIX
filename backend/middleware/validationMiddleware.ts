import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "../errors";

/**
 * 🎯 Validation Result Checker
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error: any) => ({
      field: error.type === "field" ? error.path : "unknown",
      message: error.msg,
      value: error.value, // Теперь TypeScript не будет ругаться
    }));

    throw new ValidationError("Ошибка валидации данных", {
      details: errorMessages,
    });
  }

  next();
};
