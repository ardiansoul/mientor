export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string // kode internal (optional)
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(msg = "Validation failed") {
    super(400, msg, "VALIDATION");
  }
}
export class AuthError extends AppError {
  constructor(msg = "Unauthorized") {
    super(401, msg, "UNAUTH");
  }
}
export class NotFoundError extends AppError {
  constructor(msg = "Not found") {
    super(404, msg, "NOT_FOUND");
  }
}
export class ConflictError extends AppError {
  constructor(msg = "Conflict") {
    super(409, msg, "CONFLICT");
  }
}

export class ForbiddenError extends AppError {
  constructor(msg = "Forbidden") {
    super(403, msg, "FORBIDDEN");
  }
}
export class InternalServerError extends AppError {
  constructor(msg = "Internal server error") {
    super(500, msg, "INTERNAL_SERVER_ERROR");
  }
}
