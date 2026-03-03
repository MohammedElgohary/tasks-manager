import { Card, Space } from "antd";
import { useTranslation } from "react-i18next";
import { memo, useMemo } from "react";
import { TaskPriority, type Analytics } from "@/models";
import { TaskCard } from "./task-card";

interface PriorityTaskCardProps {
  analytics: Analytics;
}

export const PriorityTaskCard = memo(function PriorityTaskCard({
  analytics,
}: PriorityTaskCardProps) {
  const { t } = useTranslation();

  const priorityItems = useMemo(
    () =>
      Object.values(TaskPriority).map((priority) => (
        <TaskCard
          key={priority}
          type={priority}
          value={analytics.priorities[priority]}
        />
      )),
    [analytics.priorities],
  );

  return (
    <Card title={t("analytics.tasksByPriority")}>
      <Space vertical className="w-full">
        {priorityItems}
      </Space>
    </Card>
  );
});
