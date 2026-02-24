import type { Task } from "../useTasks";

const PRIORITY_COLORS: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const date = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className={`task-card ${task.completed ? "task-card--done" : ""}`}>
      <div className="task-card__header">
        <span
          className="task-card__priority"
          style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
        >
          {task.priority}
        </span>
        <span className="task-card__date">{date}</span>
      </div>

      <h3 className="task-card__title">{task.title}</h3>
      {task.description && <p className="task-card__desc">{task.description}</p>}

      <div className="task-card__actions">
        <button onClick={onToggle}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} className="btn--danger">Delete</button>
      </div>
    </div>
  );
}
