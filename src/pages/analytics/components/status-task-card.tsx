import { Card, Space } from "antd";
import { useTranslation } from "react-i18next";
import { memo, useMemo } from "react";
import { TaskStatus, type Analytics } from "@/models";
import { TaskCard } from "./task-card";

interface StatusTaskCardProps {
  analytics: Analytics;
}

export const StatusTaskCard = memo(function StatusTaskCard({
  analytics,
}: StatusTaskCardProps) {
  const { t } = useTranslation();

  const statusItems = useMemo(
    () =>
      Object.values(TaskStatus).map((status) => (
        <TaskCard
          key={status}
          type={status}
          value={analytics.statuses[status]}
        />
      )),
    [analytics.statuses],
  );

  return (
    <Card title={t("analytics.tasksByStatus")}>
      <Space vertical className="w-full">
        {statusItems}
      </Space>
    </Card>
  );
});
