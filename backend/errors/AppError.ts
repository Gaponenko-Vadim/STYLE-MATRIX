// errors.ts
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Специализированные классы ошибок
export class NotFoundError extends AppError {
  constructor(message: string = "Ресурс не найден", details?: any) {
    super(message, 404, true, details);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Ошибка валидации", details?: any) {
    super(message, 400, true, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Неавторизованный доступ", details?: any) {
    super(message, 401, true, details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Ошибка аутентификации", details?: any) {
    super(message, 401, true, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Доступ запрещен", details?: any) {
    super(message, 403, true, details);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Конфликт данных", details?: any) {
    super(message, 409, true, details);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Внутренняя ошибка сервера", details?: any) {
    super(message, 500, true, details);
  }
}
