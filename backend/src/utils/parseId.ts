import { Request, Response } from "express";
import { ERRORS } from "../constants";

export function parseId(req: Request, res: Response): number | null {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: ERRORS.INVALID_ID ?? "Invalid id" });
    return null;
  }
  return id;
}