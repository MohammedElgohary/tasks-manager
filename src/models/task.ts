export enum TaskStatus {
  ON_HOLD = 'ON_HOLD',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum ImportMode {
  REPLACE = 'REPLACE',
  MERGE = 'MERGE',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string | null;
  dueDate: string | null;
  priority: TaskPriority;
}

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export interface Analytics {
  statuses: {
    [key in TaskStatus]: number;
  };
  priorities: {
    [key in TaskPriority]: number;
  };
  total: number;
  overdue: number;
  completionRate: number;
}
