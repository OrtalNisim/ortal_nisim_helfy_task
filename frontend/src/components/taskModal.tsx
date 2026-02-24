import { useEffect } from "react";
import TaskForm from "./taskForm";
import type { Task } from "../useTasks";

interface EditModalProps {
  task: Task;
  onSubmit: (data: { title: string; description: string; priority: string }) => Promise<void>;
  onClose: () => void;
}

export default function EditModal({ task, onSubmit, onClose }: EditModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-label="Edit task">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <TaskForm
          initial={{ title: task.title, description: task.description, priority: task.priority }}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
