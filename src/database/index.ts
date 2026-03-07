import dayjs from 'dayjs';
import {
  type Task,
  type TaskInput,
  TaskStatus,
  type Analytics,
  TaskPriority,
  ImportMode,
} from '@/models';
import { v4 as uuidv4 } from 'uuid';

/**
 * The key used to store the tasks in localStorage.
 */
const TASK_KEY = 'tasks-app-data';

/**
 * TaskDB is a class that manages the tasks in the database.
 * It uses localStorage to store the tasks.
 */
class TaskDB {
  private tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const tasks = localStorage.getItem(TASK_KEY);
    if (!tasks) return;
    this.tasks = JSON.parse(tasks);
  }

  private saveTasks(): void {
    localStorage.setItem(TASK_KEY, JSON.stringify(this.tasks));
  }

  public getTasks(): Array<Task> {
    return this.tasks;
  }

  public addTask(task: TaskInput): void {
    this.tasks.push({
      ...task,
      id: uuidv4(),
      createdAt: dayjs().toISOString(),
      updatedAt: null,
    });

    this.saveTasks();
  }

  public updateTask(id: string, newTask: Partial<TaskInput>): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return;

    this.tasks[index] = {
      ...this.tasks[index],
      ...newTask,
      updatedAt: dayjs().toISOString(),
    };
    this.saveTasks();
  }

  public deleteTask(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveTasks();
  }

  public changeTaskStatus(taskId: string, newStatus: TaskStatus): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.status = newStatus;
    task.updatedAt = dayjs().toISOString();
    this.saveTasks();
  }

  public getAnalytics(): Analytics {
    const now = dayjs();
    const stats = this.tasks.reduce(
      (acc, t) => {
        // Status counts
        acc.statuses[t.status] = (acc.statuses[t.status] || 0) + 1;

        // Priority counts
        acc.priorities[t.priority] = (acc.priorities[t.priority] || 0) + 1;

        // Overdue
        if (
          t.dueDate &&
          dayjs(t.dueDate).isBefore(now, 'day') &&
          t.status !== TaskStatus.COMPLETED
        ) {
          acc.overdue += 1;
        }

        return acc;
      },
      {
        statuses: {
          [TaskStatus.COMPLETED]: 0,
          [TaskStatus.IN_PROGRESS]: 0,
          [TaskStatus.PENDING]: 0,
          [TaskStatus.ON_HOLD]: 0,
        },
        priorities: {
          [TaskPriority.CRITICAL]: 0,
          [TaskPriority.HIGH]: 0,
          [TaskPriority.MEDIUM]: 0,
          [TaskPriority.LOW]: 0,
        },
        overdue: 0,
      } as Analytics
    );

    const total = this.tasks.length;
    const completed = stats.statuses[TaskStatus.COMPLETED] || 0;

    return {
      ...stats,
      total,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }

  public importTasks(tasks: Task[], mode: ImportMode = ImportMode.MERGE): void {
    if (mode === ImportMode.REPLACE) {
      this.tasks = [...tasks];
    } else {
      const existingIds = new Set(this.tasks.map((t) => t.id));
      const newTasks = tasks.filter((t) => !existingIds.has(t.id));

      this.tasks = [...this.tasks, ...newTasks];
    }
    this.saveTasks();
  }
}

/**
 * The instance of the TaskDB class.
 */
const taskDB = new TaskDB();
export default taskDB;
