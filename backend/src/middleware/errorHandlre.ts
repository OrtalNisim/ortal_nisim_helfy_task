import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(`[Error] ${err.message}`);
  res.status(500).json({ error: ERRORS.INTERNAL_SERVER_ERROR });
}
