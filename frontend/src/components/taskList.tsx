import { useEffect, useState } from "react";
import TaskCard from "./taskItem";
import type { Task } from "../useTasks";

interface CarouselProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const VISIBLE = 3;

export default function Carousel({ tasks, onToggle, onEdit, onDelete }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const n = tasks.length;

  useEffect(() => {
    setIndex((i) => (n === 0 ? 0 : Math.min(i, n - 1)));
  }, [n]);

  if (n === 0) return <p className="empty-state">No tasks to show. Add one above!</p>;

  const count = Math.min(VISIBLE, n);
  const visibleTasks = Array.from({ length: count }, (_, k) => tasks[(index + k) % n]);

  const canMove = n > VISIBLE;
  const go = (dir: number) => {
    if (!canMove) return;
    setIndex((i) => (i + dir + n) % n);
  };

  return (
    <div className="carousel">
      <button className="carousel__btn carousel__btn--prev" onClick={() => go(-1)} disabled={!canMove} aria-label="Previous">
        &lsaquo;
      </button>

      <div className="carousel__grid">
        {visibleTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => onToggle(task)}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))}
      </div>

      <button className="carousel__btn carousel__btn--next" onClick={() => go(1)} disabled={!canMove} aria-label="Next">
        &rsaquo;
      </button>
    </div>
  );
}