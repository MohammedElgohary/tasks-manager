import { useDrag } from 'react-dnd';
import type { DragItem, Task } from '@/models';

export const TASK_TYPE = 'TASK';

export function useDragTask(task: Task, index: number) {
  const [{ isDragging }, dragRef] = useDrag({
    type: TASK_TYPE,
    item: (): DragItem => ({ task, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return { isDragging, dragRef };
}
