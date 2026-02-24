import { Router, Request, Response } from "express";
import * as store from "../store";
import { ERRORS } from "../constants";
import { validateCreateTask, validateUpdateTask } from "../middleware/validate";
import { parseId } from "../utils/parseId";

const router = Router();


router.get("/", (_req: Request, res: Response) => {
  res.json(store.getAll());
});

router.post("/", validateCreateTask, (req: Request, res: Response) => {
  const { title, description, priority } = req.body;
  const task = store.create(title, description, priority);
  res.status(201).json(task);
});

router.put("/:id", validateUpdateTask, (req: Request, res: Response) => {
  const id = parseId(req, res);
  if (id === null) return;

  const task = store.update(id, req.body);
  if (!task) {
    res.status(404).json({ error: ERRORS.TASK_NOT_FOUND });
    return;
  }
  res.json(task);
});

router.patch("/:id/toggle", (req: Request, res: Response) => {
  const id = parseId(req, res);
  if (id === null) return;

  const task = store.toggle(id);
  if (!task) {
    res.status(404).json({ error: ERRORS.TASK_NOT_FOUND });
    return;
  }
  res.json(task);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseId(req, res);
  if (id === null) return;

  const removed = store.remove(id);
  if (!removed) {
    res.status(404).json({ error: ERRORS.TASK_NOT_FOUND });
    return;
  }
  res.status(204).send();
});

export default router;