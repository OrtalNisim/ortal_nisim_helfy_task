const baseUrl= import.meta.env.VITE_BASE_SERVER_URL;
import { HTTP_METHODS } from "../constants/httpMethods";
import { ERROR_MESSAGES } from "../constants/errorsMessages";

export async function fetchTasks() {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error(ERROR_MESSAGES.FAILED_TO_FRTCH_TASKS);
  return res.json();
}

export async function createTask(data: {
  title: string;
  description?: string;
  priority: string;
}) {
  const res = await fetch(baseUrl, {
    method: HTTP_METHODS.POST,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || ERROR_MESSAGES.FAILED_TO_CREATE_TASK);
  }
  return res.json();
}

export async function updateTask(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    priority: string;
    completed: boolean;
  }>
) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: HTTP_METHODS.PUT,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || ERROR_MESSAGES.FAILED_TO_UPDATE_TASK);
  }
  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`${baseUrl}/${id}`, { method: HTTP_METHODS.DELETE });
  if (!res.ok) throw new Error(ERROR_MESSAGES.FAILED_TO_DELETE_TASK);
  return res.json();
}

export async function toggleTask(id: string) {
  const res = await fetch(`${baseUrl}/${id}/toggle`, { method: HTTP_METHODS.PATCH });
  if (!res.ok) throw new Error(ERROR_MESSAGES.FAILED_TO_TOGGLE_TASK);
  return res.json();
}

export function extractError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}
