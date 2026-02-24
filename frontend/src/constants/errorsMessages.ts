export const ERROR_MESSAGES = {
    FAILED_TO_FRTCH_TASKS:"Failed to fetch tasks",
    FAILED_TO_CREATE_TASK:"Failed to create task",
    FAILED_TO_UPDATE_TASK:"Failed to update task",
    FAILED_TO_DELETE_TASK:"Failed to delete task",
    FAILED_TO_TOGGLE_TASK:"Failed to toggle task",
} as const;
  
  export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;