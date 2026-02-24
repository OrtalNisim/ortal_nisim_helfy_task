import type { Task } from "../useTasks";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

interface FilterBarProps {
  filter: string;
  onChange: (filter: string) => void;
  tasks: Task[];
}

export default function FilterBar({ filter, onChange, tasks }: FilterBarProps) {
  const counts: Record<string, number> = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn ${filter === key ? "filter-btn--active" : ""}`}
          onClick={() => onChange(key)}
          aria-pressed={filter === key}
        >
          {label} ({counts[key]})
        </button>
      ))}
    </div>
  );
}
