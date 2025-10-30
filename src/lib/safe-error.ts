import { isDevelopment } from "@/config/env";

const SENSITIVE_PATTERNS = {
  apiKey: /\b[A-Za-z0-9_-]{32,}\b/g,
  jwt: /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
  bearerToken: /Bearer\s+[A-Za-z0-9_-]+/gi,

  password: /"password"\s*:\s*"[^"]+"/gi,
  secret: /"secret"\s*:\s*"[^"]+"/gi,

  filePath: /\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_./-]+/g,

  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  cpf: /\d{3}\.\d{3}\.\d{3}-\d{2}/g,

  creditCard: /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/g,
} as const;

const SENSITIVE_KEYWORDS = [
  "password",
  "senha",
  "token",
  "secret",
  "key",
  "apikey",
  "api_key",
  "authorization",
  "auth",
  "credential",
  "private",
  "ssn",
  "cpf",
  "credit_card",
  "cvv",
] as const;

export interface SafeError {
  name: string;
  message: string;
  code?: string;
  statusCode?: number;
  stack?: string;
  timestamp: string;
  environment: "development" | "production";
}

export interface HttpError extends Error {
  statusCode?: number;
  status?: number;
}

export interface CodedError extends Error {
  code?: string | number;
  errorCode?: string | number;
}

export interface ResponseError extends Error {
  response?: {
    status?: number;
    statusCode?: number;
  };
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function isHttpError(error: unknown): error is HttpError {
  return isError(error) && ("statusCode" in error || "status" in error);
}

export function isCodedError(error: unknown): error is CodedError {
  return isError(error) && ("code" in error || "errorCode" in error);
}

export function isResponseError(error: unknown): error is ResponseError {
  return isError(error) && "response" in error;
}

function sanitizeString(str: string): string {
  let sanitized = str;

  sanitized = sanitized.replace(SENSITIVE_PATTERNS.apiKey, "[REDACTED_KEY]");
  sanitized = sanitized.replace(SENSITIVE_PATTERNS.jwt, "[REDACTED_TOKEN]");
  sanitized = sanitized.replace(
    SENSITIVE_PATTERNS.bearerToken,
    "Bearer [REDACTED]",
  );

  sanitized = sanitized.replace(
    SENSITIVE_PATTERNS.password,
    '"password":"[REDACTED]"',
  );
  sanitized = sanitized.replace(
    SENSITIVE_PATTERNS.secret,
    '"secret":"[REDACTED]"',
  );

  sanitized = sanitized.replace(SENSITIVE_PATTERNS.email, "[REDACTED_EMAIL]");
  sanitized = sanitized.replace(SENSITIVE_PATTERNS.cpf, "[REDACTED_CPF]");

  sanitized = sanitized.replace(
    SENSITIVE_PATTERNS.creditCard,
    "[REDACTED_CARD]",
  );

  if (!isDevelopment()) {
    sanitized = sanitized.replace(SENSITIVE_PATTERNS.filePath, "[PATH]");
  }

  return sanitized;
}

function sanitizeStack(stack: string | undefined): string | undefined {
  if (!stack) return undefined;

  if (!isDevelopment()) {
    return stack.split("\n")[0];
  }

  return sanitizeString(stack);
}

function sanitizeMessage(message: string): string {
  const sanitized = sanitizeString(message);

  const lowerMessage = sanitized.toLowerCase();

  const hasSensitiveKeyword = SENSITIVE_KEYWORDS.some((keyword) =>
    lowerMessage.includes(keyword),
  );

  if (hasSensitiveKeyword && !isDevelopment()) {
    return "An error occurred. Please contact support if the issue persists.";
  }

  return sanitized;
}

function extractStatusCode(error: Error): number | undefined {
  if (isHttpError(error)) {
    return error.statusCode || error.status;
  }

  if (isResponseError(error)) {
    return error.response?.status || error.response?.statusCode;
  }

  return undefined;
}

function extractErrorCode(error: Error): string | undefined {
  if (isCodedError(error)) {
    const code = error.code || error.errorCode;
    return code !== undefined ? String(code) : undefined;
  }

  return undefined;
}

export function safeError(error: unknown): SafeError {
  const timestamp = new Date().toISOString();
  const environment = isDevelopment() ? "development" : "production";

  if (!isError(error)) {
    return {
      name: "UnknownError",
      message: "An unknown error occurred",
      timestamp,
      environment,
    };
  }

  const safeErr: SafeError = {
    name: error.name,
    message: sanitizeMessage(error.message),
    timestamp,
    environment,
  };

  const code = extractErrorCode(error);
  if (code) {
    safeErr.code = code;
  }

  const statusCode = extractStatusCode(error);
  if (statusCode) {
    safeErr.statusCode = statusCode;
  }

  const stack = sanitizeStack(error.stack);
  if (stack) {
    safeErr.stack = stack;
  }

  return safeErr;
}

export function logSafeError(error: unknown, context?: string): SafeError {
  const safe = safeError(error);

  if (isDevelopment()) {
    console.error(`[${context || "Error"}]`, safe);
  } else {
    console.error(
      JSON.stringify({
        context,
        ...safe,
      }),
    );
  }

  return safe;
}

export interface ErrorResponse {
  error: {
    message: string;
    code?: string;
  };
  statusCode: number;
}

export function safeErrorToResponse(error: unknown): ErrorResponse {
  const safe = safeError(error);

  return {
    error: {
      message: safe.message,
      code: safe.code,
    },
    statusCode: safe.statusCode || 500,
  };
}

export class HttpErrorClass extends Error implements HttpError {
  public statusCode: number;
  public code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.code = code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpErrorClass);
    }
  }
}

export const HttpErrors = {
  badRequest(message: string = "Bad Request", code?: string): HttpErrorClass {
    return new HttpErrorClass(message, 400, code || "BAD_REQUEST");
  },

  unauthorized(
    message: string = "Unauthorized",
    code?: string,
  ): HttpErrorClass {
    return new HttpErrorClass(message, 401, code || "UNAUTHORIZED");
  },

  forbidden(message: string = "Forbidden", code?: string): HttpErrorClass {
    return new HttpErrorClass(message, 403, code || "FORBIDDEN");
  },

  notFound(message: string = "Not Found", code?: string): HttpErrorClass {
    return new HttpErrorClass(message, 404, code || "NOT_FOUND");
  },

  conflict(message: string = "Conflict", code?: string): HttpErrorClass {
    return new HttpErrorClass(message, 409, code || "CONFLICT");
  },

  unprocessable(
    message: string = "Unprocessable Entity",
    code?: string,
  ): HttpErrorClass {
    return new HttpErrorClass(message, 422, code || "UNPROCESSABLE_ENTITY");
  },

  internal(
    message: string = "Internal Server Error",
    code?: string,
  ): HttpErrorClass {
    return new HttpErrorClass(message, 500, code || "INTERNAL_SERVER_ERROR");
  },
} as const;
