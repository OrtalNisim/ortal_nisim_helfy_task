export const PRIORITIES = ["low", "medium", "high"] as const;

export type Priority = (typeof PRIORITIES)[number];
export const ERRORS = {
  TITLE_REQUIRED: "Title is required",
  TITLE_EMPTY: "Title cannot be empty",
  TASK_NOT_FOUND: "Task not found",
  INVALID_PRIORITY: `Priority must be one of: ${PRIORITIES.join(", ")}`,
  INVALID_ID: "Invalid id",
  INTERNAL_SERVER_ERROR: "Internal server error"
} as const;
