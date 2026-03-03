import {
  TaskStatus,
  type Analytics,
  type ImportMode,
  type Task,
  type TaskInput,
  type TaskPriority,
} from "@/models";
import db from "@/database";
import { sleepRandom } from "@/utils/sleep";
import dayjs from "dayjs";

//#region get tasks list
type RequestGetTasksArgs = {
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  isOverdue?: boolean;
  signal?: AbortSignal;
};

export async function requestGetTasks(
  { search, status, priority, isOverdue }: RequestGetTasksArgs,
  signal?: AbortSignal,
): Promise<Array<Task>> {
  await sleepRandom();

  let tasks = db.getTasks();

  if (isOverdue) {
    tasks = tasks.filter(
      (task) =>
        task.dueDate &&
        dayjs(task.dueDate).isBefore(dayjs(), "day") &&
        task.status !== TaskStatus.COMPLETED,
    );
  }

  if (status) {
    tasks = tasks.filter((task) => task.status === status);
  }

  if (priority) {
    tasks = tasks.filter((task) => task.priority === priority);
  }

  if (search) {
    tasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return tasks;
}
//#endregion get tasks list

//#region add task
export async function requestAddTask(
  task: TaskInput,
  signal?: AbortSignal,
): Promise<void> {
  await sleepRandom();

  db.addTask(task);
}
//#endregion add task

//#region update task
export async function requestUpdateTask(
  id: string,
  task: TaskInput,
  signal?: AbortSignal,
): Promise<void> {
  await sleepRandom();

  db.updateTask(id, task);
}
//#endregion update task

//#region delete task
export async function requestDeleteTask(
  id: string,
  signal?: AbortSignal,
): Promise<void> {
  await sleepRandom();

  db.deleteTask(id);
}
//#endregion delete task

//#region change task status
export async function requestChangeTaskStatus(
  taskId: string,
  newStatus: TaskStatus,
  signal?: AbortSignal,
): Promise<void> {
  await sleepRandom();

  db.changeTaskStatus(taskId, newStatus);
}
//#endregion change task status

//#region get analytics
export async function requestGetAnalytics(
  signal?: AbortSignal,
): Promise<Analytics> {
  await sleepRandom();

  return db.getAnalytics();
}
//#endregion get analytics

//#region import tasks
export async function requestImportTasks(
  tasks: Task[],
  mode: ImportMode,
  signal?: AbortSignal,
): Promise<void> {
  await sleepRandom();

  db.importTasks(tasks, mode);
}
//#endregion import tasks
