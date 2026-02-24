import { useState, type FormEvent, type ChangeEvent } from "react";

interface TaskFormData {
  title: string;
  description: string;
  priority: string;
}

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => Promise<unknown>;
  initial?: TaskFormData;
  onCancel?: () => void;
}

const EMPTY: TaskFormData = { title: "", description: "", priority: "medium" };

export default function TaskForm({ onSubmit, initial, onCancel }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormData>(initial || EMPTY);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const ok = await onSubmit(form);
      if (ok !== false) setForm(EMPTY);
    } finally {
      setSubmitting(false);
    }
  } 
  

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
        maxLength={100}
        disabled={submitting}
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        rows={2}
        disabled={submitting}
      />
      <div className="task-form__row">
        <select name="priority" value={form.priority} onChange={handleChange} disabled={submitting}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" disabled={submitting}>
          {initial ? "Save" : "Add Task"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn--secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
