import { Context } from "hono";
import { ZodError, ZodIssue } from "zod";
import { HttpException } from "./exceptions";

const formatZodError = (issues: ZodIssue[]) => {
  return issues.map((issue) => ({
    field: issue.path[0],
    message: issue.message,
  }));
};

/**
 * Global error handler for Hono
 */
export const appError = (err: unknown, c: Context) => {
  if (err instanceof ZodError) {
    return c.json(
      {
        success: false,
        statusCode: 400,
        message: "Validation Error",
        details: formatZodError(err.issues),
      },
      400,
    );
  }

  if (err instanceof HttpException) {
    const statusCode = parseInt(String(err.statusCode), 10);
    return c.json(
      {
        success: false,
        statusCode: err.statusCode,
        message: err.message,
        details: err.details ?? null,
      },
      err.statusCode,
    );
  }

  return c.json(
    {
      success: false,
      statusCode: 500,
      message: "Something went wrong",
    },
    500,
  );
};
