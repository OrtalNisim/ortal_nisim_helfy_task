import { type Priority } from "./constants";


export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
}

let tasks: Task[] = [];
let nextId = 1;

export function getAll(): Task[] {
  return [...tasks];
}

export function getById(id: number): Task | undefined {
  return tasks.find(task => task.id === id);
}

export function create(title: string, description: string, priority: Priority): Task {
  const id = nextId++;
  const task: Task = {
    id,
    title,
    description,
    priority,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(task);
  return task;
}

export function update(id: number, fields: Partial<Pick<Task, "title" | "description" | "priority" | "completed">>): Task | null {
  const task = tasks.find(task => task.id === id);
  if (!task) return null;

  if (fields.title !== undefined) task.title = fields.title;
  if (fields.description !== undefined) task.description = fields.description;
  if (fields.priority !== undefined) task.priority = fields.priority;
  if (fields.completed !== undefined) task.completed = fields.completed;

  return task;
}

export function toggle(id: number): Task | null {
  const task = tasks.find(task => task.id === id);
  if (!task) return null;
  task.completed = !task.completed;
  return task;
}

export function remove(id: number): boolean {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

export function clear(): void {
  tasks = [];
  nextId = 1;
}
