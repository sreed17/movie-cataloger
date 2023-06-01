import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  statusCode: number = 500;
  status: "fail" | "error";
  constructor(message: string, statusCode?: number) {
    super(message);
    if (statusCode) this.statusCode = statusCode;
    this.status =
      this.statusCode >= 400 && this.statusCode < 500 ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export function customErrorHandler(
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = "statusCode" in err ? err.statusCode : 500;
  const status = "status" in err ? err.status : "error";
  res.status(statusCode).json({ status, payload: err.message });
}
