import { Request, Response, NextFunction } from "express";
import { ERRORS, PRIORITIES } from "../constants";

export function validateCreateTask(req: Request, res: Response, next: NextFunction): void {
  const { title } = req.body;

  if (!title || !title.trim()) {
    res.status(400).json({ error: ERRORS.TITLE_REQUIRED });
    return;
  }

  req.body.title = title.trim();
  req.body.description = (req.body.description || "").trim();
  req.body.priority = PRIORITIES.includes(req.body.priority) ? req.body.priority : "medium";
  next();
}

export function validateUpdateTask(req: Request, res: Response, next: NextFunction): void {
  const { title, priority } = req.body;

  if (title !== undefined && !title.trim()) {
    res.status(400).json({ error: ERRORS.TITLE_EMPTY });
    return;
  }

  if (title !== undefined) req.body.title = title.trim();
  if (req.body.description !== undefined) req.body.description = req.body.description.trim();

  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    res.status(400).json({ error: ERRORS.INVALID_PRIORITY });
    return;
  }

  next();
}
