import { useState, useEffect, useCallback, useMemo } from "react";
import * as api from "./service/api";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .fetchTasks()
      .then(setTasks)
      .catch((err: unknown) => setError(api.extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return tasks;
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks.filter((t) => !t.completed);
  }, [tasks, filter]);

  const addTask = useCallback(
    async (data: { title: string; description?: string; priority: string }) => {
      const task = await api.createTask(data);
      setTasks((prev) => [...prev, task]);
      return task;
    },
    [],
  );

  const editTask = useCallback(async (id: string, fields: Partial<Task>) => {
    const updated = await api.updateTask(id, fields);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const toggleTask = useCallback(async (task: Task) => {
    const updated = await api.updateTask(task.id, {
      completed: !task.completed,
    });
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  }, []);

  const removeTask = useCallback(async (id: string) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    tasks: filtered,
    allTasks: tasks,
    filter,
    setFilter,
    error,
    setError,
    loading,
    addTask,
    editTask,
    toggleTask,
    removeTask,
  };
}
