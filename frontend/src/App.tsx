import { useState } from "react";
import "./App.css";
import useTasks, { type Task } from "./useTasks";
import TaskForm from "./components/taskForm";
import Carousel from "./components/taskList";
import FilterBar from "./components/taskFilter";
import EditModal from "./components/taskModal";
import { extractError } from "./service/api";

export default function App() {
  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    error,
    setError,
    loading,
    addTask,
    editTask,
    toggleTask,
    removeTask,
  } = useTasks();

  const [editing, setEditing] = useState<Task | null>(null);

  async function handleCreate(data: {
    title: string;
    description?: string;
    priority: string;
  }) {
    try {
      await addTask(data);
      setError(null);
      return true;
    } catch (err) {
      setError(extractError(err));
      return false;
    }
  }

  async function handleEdit(data: {
    title: string;
    description?: string;
    priority?: string;
  }) {
    try {
      await editTask(editing!.id, data as Partial<Task>);
      setEditing(null);
      setError(null);
    } catch (err) {
      setError(extractError(err));
    }
  }

  async function handleToggle(task: Task) {
    try {
      await toggleTask(task);
    } catch (err) {
      setError(extractError(err));
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await removeTask(id);
    } catch (err) {
      setError(extractError(err));
    }
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          {error}
          <button onClick={() => setError(null)} aria-label="Dismiss error">&times;</button>
        </div>
      )}

      <TaskForm onSubmit={handleCreate} />

      <FilterBar filter={filter} onChange={setFilter} tasks={allTasks} />

      <Carousel
        tasks={tasks}
        onToggle={handleToggle}
        onEdit={setEditing}
        onDelete={handleDelete}
      />

      {editing && (
        <EditModal
          task={editing}
          onSubmit={handleEdit}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
