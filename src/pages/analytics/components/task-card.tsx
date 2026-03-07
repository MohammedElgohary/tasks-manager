import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { prioritiesMap, statusesMapper } from '@/utils';
import { TaskPriority, TaskStatus } from '@/models';
import { Link } from 'react-router-dom';

interface TaskCardProps {
  type: TaskPriority | TaskStatus;
  value: number;
}

export const TaskCard = memo(function TaskCard({ type, value }: TaskCardProps) {
  const { t } = useTranslation();
  const { icon, color, label } =
    type in prioritiesMap
      ? prioritiesMap[type as TaskPriority]
      : statusesMapper[type as TaskStatus];

  const isStatus = type in TaskStatus;
  const filterUrl = isStatus ? `/?status=${type}` : `/?priority=${type}`;

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--ant-color-bg-text-hover)';
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  }, []);

  return (
    <Link to={filterUrl} style={{ display: 'block', color: 'inherit' }}>
      <Space
        align="center"
        className="flex w-full justify-between p-2 rounded transition-colors cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Space>
          <span style={{ color }}>{icon}</span>
          <span style={{ color }}>{t(label)}</span>
        </Space>

        <strong className="font-semibold">{value}</strong>
      </Space>
    </Link>
  );
});
