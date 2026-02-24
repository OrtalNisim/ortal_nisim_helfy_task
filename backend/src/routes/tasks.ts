import { Router, Request, Response } from "express";

const router = Router();
// GET /api/tasks
router.get("/", (req: Request, res: Response) => {
  res.json([{ id: "1", title: "First task" }]);
});

export default router;