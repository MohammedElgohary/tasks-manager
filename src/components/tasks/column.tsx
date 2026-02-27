import { Card, List, theme, Grid } from "antd";
import { StatusBadge, Task as TaskComponent } from "@/components";
import type { TaskStatus } from "@/models";
import { useDropTask } from "@/hooks";
import { requestChangeTaskStatus } from "@/network";
import { useMemo, type Ref, memo } from "react";
import { useTasksStore } from "@/stores";

const { useBreakpoint } = Grid;

interface ColumnProps {
  status: TaskStatus;
}

function Column({ status }: ColumnProps) {
  const tasks = useTasksStore((state) => state.tasks);
  const isLoading = useTasksStore((state) => state.isLoading);
  const refreshTasks = useTasksStore((state) => state.refreshTasks);

  const filteredTasks = tasks.filter((task) => task.status === status);

  const { token } = theme.useToken();
  const screens = useBreakpoint();

  const { isOver, canDrop, dropRef } = useDropTask({
    status,
    onDropTask: (draggedId, newStatus) => {
      requestChangeTaskStatus(draggedId, newStatus)
        .then(refreshTasks)
        .catch(console.error);
    },
  });

  const isActive = isOver && canDrop;
  const isMobile = !screens.md;

  const ListComponent = useMemo(
    () => (
      <List
        dataSource={filteredTasks}
        split={false}
        loading={isLoading}
        renderItem={(task, index) => (
          <List.Item
            className={
              isMobile
                ? "!p-0 my-2 last:!mb-0 first:!mt-0"
                : "!p-0 my-3 last:!mb-0 first:!mt-0"
            }
          >
            <TaskComponent task={task} index={index} />
          </List.Item>
        )}
      />
    ),
    [filteredTasks, isLoading, isMobile],
  );

  if (isMobile) {
    return ListComponent;
  }

  return (
    <div
      ref={dropRef as unknown as Ref<HTMLDivElement>}
      className="h-full w-full flex"
    >
      <Card
        size={isMobile ? "small" : "default"}
        title={<StatusBadge target={status} showText={!isMobile} />}
        style={{
          backgroundColor: isActive ? token.colorPrimaryBg : undefined,
          transition: "background-color 0.2s ease",
        }}
        className="h-full w-full flex flex-col"
        classNames={{ body: "flex-1 overflow-auto" }}
      >
        {ListComponent}
      </Card>
    </div>
  );
}

export default memo(Column);
