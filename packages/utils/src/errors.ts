export class AppError extends Error {
  code: string;

  statusCode: number;

  field?: string;

  constructor(
    message: string,
    code: string,
    statusCode = 500,
    field?: string,
  ) {
    super(message);

    this.code = code;

    this.statusCode = statusCode;

    this.field = field;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      message,
      "VALIDATION_ERROR",
      400,
      field,
    );
  }
}

export class AuthError extends AppError {
  constructor(message = "Unauthorized") {
    super(
      message,
      "AUTH_ERROR",
      401,
    );
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(
      message,
      "NOT_FOUND",
      404,
    );
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Rate limit exceeded") {
    super(
      message,
      "RATE_LIMIT",
      429,
    );
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = "External service failure") {
    super(
      message,
      "EXTERNAL_SERVICE_ERROR",
      502,
    );
  }
}