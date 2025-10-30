import { isDevelopment, isProduction } from "@/config/env";

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export interface LogContext {
  userId?: string;
  requestId?: string;
  traceId?: string;
  component?: string;
  action?: string;
  [key: string]: string | number | boolean | undefined | null;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const SENSITIVE_FIELDS = [
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "apiKey",
  "secret",
  "privateKey",
  "creditCard",
  "cvv",
  "ssn",
  "pin",
  "authorization",
  "cookie",
  "session",
] as const;

const COLORS = {
  debug: "\x1b[36m", // Cyan
  info: "\x1b[32m", // Green
  warn: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
} as const;

type Primitive = string | number | boolean | null | undefined;

type SanitizableValue = Primitive | SanitizableObject | SanitizableArray;

interface SanitizableObject {
  [key: string]: SanitizableValue;
}

type SanitizableArray = SanitizableValue[];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isPrimitive(value: unknown): value is Primitive {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function sanitizeValue(value: unknown, depth: number = 0): SanitizableValue {
  if (depth > 5) return "[Max Depth Reached]";

  if (isPrimitive(value)) return value;

  if (isArray(value)) {
    return value.map((item) => sanitizeValue(item, depth + 1));
  }

  if (isObject(value)) {
    return sanitizeObject(value, depth);
  }

  return String(value);
}

function sanitizeObject(
  obj: Record<string, unknown>,
  depth: number = 0,
): SanitizableObject {
  if (depth > 5) {
    return { _truncated: "[Max Depth Reached]" };
  }

  const sanitized: SanitizableObject = {};

  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();

    const isSensitive = SENSITIVE_FIELDS.some((field) =>
      lowerKey.includes(field.toLowerCase()),
    );

    if (isSensitive) {
      sanitized[key] = "[REDACTED]";
    } else {
      sanitized[key] = sanitizeValue(value, depth + 1);
    }
  }

  return sanitized;
}

function sanitizeError(error: Error): {
  name: string;
  message: string;
  stack?: string;
} {
  return {
    name: error.name,
    message: error.message,
    stack: isDevelopment() ? error.stack : undefined,
  };
}

function formatColoredLog(entry: LogEntry): string {
  const color = COLORS[entry.level];
  const timestamp = new Date(entry.timestamp).toLocaleTimeString("pt-BR");

  let output = `${COLORS.dim}[${timestamp}]${COLORS.reset} ${color}${COLORS.bold}${entry.level.toUpperCase()}${COLORS.reset} ${entry.message}`;

  if (entry.context && Object.keys(entry.context).length > 0) {
    output += `\n${COLORS.dim}Context:${COLORS.reset} ${JSON.stringify(entry.context, null, 2)}`;
  }

  if (entry.error) {
    output += `\n${COLORS.error}Error:${COLORS.reset} ${entry.error.name}: ${entry.error.message}`;
    if (entry.error.stack) {
      output += `\n${COLORS.dim}${entry.error.stack}${COLORS.reset}`;
    }
  }

  return output;
}

function formatJsonLog(entry: LogEntry): string {
  return JSON.stringify(entry);
}

function writeLog(entry: LogEntry): void {
  const output = isDevelopment()
    ? formatColoredLog(entry)
    : formatJsonLog(entry);

  switch (entry.level) {
    case LogLevel.DEBUG:
      console.debug(output);
      break;
    case LogLevel.INFO:
      console.info(output);
      break;
    case LogLevel.WARN:
      console.warn(output);
      break;
    case LogLevel.ERROR:
      console.error(output);
      break;
  }

  // TODO: Integrar com serviço externo (Sentry, LogRocket, etc)
  if (isProduction()) {
    //   sendToExternalService(entry);
  }
}

function createLogEntry(
  level: LogLevel,
  message: string,
  context?: LogContext,
  error?: Error,
): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };

  if (context) {
    entry.context = sanitizeObject(context) as LogContext;
  }

  if (error) {
    entry.error = sanitizeError(error);
  }

  return entry;
}

class Logger {
  debug(message: string, context?: LogContext): void {
    if (!isDevelopment()) return;

    const entry = createLogEntry(LogLevel.DEBUG, message, context);
    writeLog(entry);
  }

  info(message: string, context?: LogContext): void {
    const entry = createLogEntry(LogLevel.INFO, message, context);
    writeLog(entry);
  }

  warn(message: string, context?: LogContext): void {
    const entry = createLogEntry(LogLevel.WARN, message, context);
    writeLog(entry);
  }

  error(message: string, error?: Error, context?: LogContext): void {
    const entry = createLogEntry(LogLevel.ERROR, message, context, error);
    writeLog(entry);
  }

  withContext(fixedContext: LogContext): Logger {
    const logger = new Logger();

    logger.debug = (message: string, context?: LogContext) => {
      this.debug(message, { ...fixedContext, ...context });
    };

    logger.info = (message: string, context?: LogContext) => {
      this.info(message, { ...fixedContext, ...context });
    };

    logger.warn = (message: string, context?: LogContext) => {
      this.warn(message, { ...fixedContext, ...context });
    };

    logger.error = (message: string, error?: Error, context?: LogContext) => {
      this.error(message, error, { ...fixedContext, ...context });
    };

    return logger;
  }
}

export const logger = new Logger();

export function createUserLogger(userId: string): Logger {
  return logger.withContext({ userId });
}

export function createRequestLogger(
  requestId: string,
  userId?: string,
): Logger {
  return logger.withContext({ requestId, userId });
}

export function sanitize<T>(data: T): SanitizableValue {
  return sanitizeValue(data);
}
