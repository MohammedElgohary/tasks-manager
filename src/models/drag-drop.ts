import type { Task } from './task';

export enum DropPosition {
  BEFORE = 'before',
  AFTER = 'after',
  NONE = 'none',
}

export interface DragItem {
  task: Task;
  index: number;
}
