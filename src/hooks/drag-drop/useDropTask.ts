import { useDrop } from "react-dnd";
import type { DragItem, TaskStatus } from "@/models";
import { TASK_TYPE } from "./useDragTask";

type UseDropTaskProps = {
  status: TaskStatus;
  onDropTask: (draggedId: string, newStatus: TaskStatus) => void;
};

export function useDropTask({ status, onDropTask }: UseDropTaskProps) {
  const [{ isOver, canDrop }, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: TASK_TYPE,

    canDrop: (item) => item.task.status !== status,

    drop: (item) => {
      if (item.task.status === status) return;

      onDropTask(item.task.id, status);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return { isOver, canDrop, dropRef: drop };
}
