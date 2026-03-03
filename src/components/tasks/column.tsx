import { Card, List, theme, Grid } from "antd";
import { StatusBadge, Task as TaskComponent } from "@/components";
import type { Task, TaskStatus } from "@/models";
import { useDropTask } from "@/hooks";
import { requestChangeTaskStatus } from "@/network";
import { useCallback, type Ref, memo } from "react";
import { useTasksStore } from "@/stores";

const { useBreakpoint } = Grid;

interface ColumnProps {
  status: TaskStatus;
}

const TaskListItem = memo(
  ({
    task,
    index,
    isMobile,
  }: {
    task: Task;
    index: number;
    isMobile: boolean;
  }) => (
    <List.Item
      className={
        isMobile
          ? "!p-0 my-2 last:!mb-0 first:!mt-0"
          : "!p-0 my-3 last:!mb-0 first:!mt-0"
      }
    >
      <TaskComponent task={task} index={index} />
    </List.Item>
  ),
);

function Column({ status }: ColumnProps) {
  const tasks = useTasksStore((state) => state.tasks);
  const isLoading = useTasksStore((state) => state.isLoading);
  const refreshTasks = useTasksStore((state) => state.refreshTasks);

  const filteredTasks = tasks.filter((task) => task.status === status);

  const { token } = theme.useToken();
  const screens = useBreakpoint();

  const onDropTask = useCallback(
    (draggedId: string, newStatus: TaskStatus) => {
      requestChangeTaskStatus(draggedId, newStatus)
        .then(refreshTasks)
        .catch(console.error);
    },
    [refreshTasks],
  );

  const { isOver, canDrop, dropRef } = useDropTask({
    status,
    onDropTask,
  });

  const isActive = isOver && canDrop;
  const isMobile = !screens.md;

  const renderItem = useCallback(
    (task: Task, index: number) => (
      <TaskListItem task={task} index={index} isMobile={isMobile} />
    ),
    [isMobile],
  );

  if (isMobile) {
    return (
      <List
        dataSource={filteredTasks}
        split={false}
        loading={isLoading}
        renderItem={renderItem}
      />
    );
  }

  return (
    <div
      ref={dropRef as unknown as Ref<HTMLDivElement>}
      className="h-full w-full flex"
    >
      <Card
        size="default"
        title={<StatusBadge target={status} showText />}
        style={{
          backgroundColor: isActive ? token.colorPrimaryBg : undefined,
          transition: "background-color 0.2s ease",
        }}
        className="h-full w-full flex flex-col"
        classNames={{ body: "flex-1 overflow-auto" }}
      >
        <List
          dataSource={filteredTasks}
          split={false}
          loading={isLoading}
          renderItem={renderItem}
        />
      </Card>
    </div>
  );
}

export default memo(Column);
