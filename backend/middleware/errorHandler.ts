import { Request, Response, NextFunction } from "express";
import { AppError, IErrorResponse, NotFoundError } from "../errors";

/**
 * 🎯 Global Error Handler Middleware
 * Обрабатывает все ошибки в приложении
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err;

  // Если это не наша кастомная ошибка, создаем универсальную
  if (!(error instanceof AppError)) {
    const statusCode = 500;
    const message = "Внутренняя ошибка сервера";
    error = new AppError(message, statusCode);
  }

  const appError = error as AppError;

  // Формируем ответ
  const errorResponse: IErrorResponse = {
    success: false,
    error: appError.constructor.name, // ← ИСПРАВЛЕНИЕ ЗДЕСЬ!
    message: appError.message,
  };

  // Добавляем details если есть
  if (appError.details) {
    errorResponse.details = appError.details;
  }

  // Добавляем stack trace в development режиме
  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = appError.stack;
  }

  // Логируем ошибку
  console.error("🚨 Error Handler:", {
    method: req.method,
    path: req.path,
    statusCode: appError.statusCode,
    message: appError.message,
    stack: appError.stack,
  });

  res.status(appError.statusCode).json(errorResponse);
};

/**
 * 🎯 Not Found Middleware
 * Обрабатывает запросы к несуществующим роутам
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotFoundError(`Ресурс ${req.method} ${req.path} не найден`));
};

/**
 * 🎯 Async Handler Wrapper
 * Избавляет от необходимости писать try/catch в каждом контроллере
 */
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
