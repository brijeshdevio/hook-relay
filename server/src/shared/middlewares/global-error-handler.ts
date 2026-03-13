import { Context } from "hono";
import { ZodError, type ZodIssue } from "zod";
import { HttpException } from "../errors/http-exception";
import { env } from "../../config";

const formatZodError = (issues: ZodIssue[]) => {
  return issues.map((issue) => ({
    field: issue.path[0],
    message: issue.message,
  }));
};

export const globalErrorHandler = (err: unknown, c: Context) => {
  const path = c.req.path;
  if (env.NODE_ENV === "development") {
    console.error("ERR: ", err);
  }

  if (err instanceof ZodError) {
    return c.json(
      {
        success: false,
        statusCode: 400,
        message: "Validation Error",
        details: formatZodError(err.issues),
        timestamp: new Date().toISOString(),
        path,
      },
      400,
    );
  }

  if (err instanceof HttpException) {
    return c.json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      details: err.details ?? null,
      timestamp: new Date().toISOString(),
      path,
    });
  }

  return c.json(
    {
      success: false,
      statusCode: 500,
      message: "Something went wrong",
      timestamp: new Date().toISOString(),
      path,
    },
    500,
  );
};
