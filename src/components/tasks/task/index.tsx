import { Button, Card, Space, Typography, Tooltip, Tag, Grid, theme } from 'antd';
import { EditOutlined, HolderOutlined } from '@ant-design/icons';
import { CreateEditTaskButton } from '@/components';
import { useDragTask } from '@/hooks';
import type { Task } from '@/models';
import { type Ref, useState, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import TaskDetailsModal from './task-details-modal';
import { formatDate, formatDueDate, prioritiesMap } from '@/utils';
import DeleteTaskModal from './delete-task-modal';

const { Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface TaskProps {
  task: Task;
  index: number;
}

function Task({ task, index }: TaskProps) {
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const { t } = useTranslation();
  const screens = useBreakpoint();
  const { token } = theme.useToken();
  const { isDragging, dragRef } = useDragTask(task, index);

  // Memoize responsive breakpoints and derived values
  const { isXs, isSm, isMd, padding } = useMemo(() => {
    const isXs = screens.xs && !screens.sm;
    const isSm = screens.sm && !screens.md;
    const isMd = screens.md && !screens.lg;
    const padding = isXs ? 12 : isSm ? 16 : isMd ? 18 : 20;
    return { isXs, isSm, isMd, padding };
  }, [screens.xs, screens.sm, screens.md, screens.lg]);

  const dueDateFormat = useMemo(
    () => formatDueDate(task.dueDate, task.status),
    [task.dueDate, task.status]
  );

  const priorityConfig = useMemo(() => prioritiesMap[task.priority], [task.priority]);

  return (
    <>
      <div
        ref={dragRef as unknown as Ref<HTMLDivElement>}
        className="w-full relative"
        data-task-id={task.id}
        data-tour="task-card"
      >
        <Card
          hoverable
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: 'all 0.2s ease',
          }}
          className="w-full"
          onClick={() => setIsOpenDetailsModal(true)}
          styles={{ body: { padding } }}
        >
          {/* HEADER - Title with drag handle */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              {!isXs && (
                <HolderOutlined
                  style={{
                    color: token.colorTextSecondary,
                    marginTop: 4,
                    fontSize: 14,
                  }}
                />
              )}

              <Text
                strong
                style={{
                  fontSize: isXs ? 14 : isSm ? 15 : 16,
                  lineHeight: 1.4,
                  display: 'block',
                }}
                ellipsis={{ tooltip: task.title }}
              >
                {task.title}
              </Text>
            </div>
          </div>

          {/* CONTEXT ROW - Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {dueDateFormat && (
              <Tooltip title={t(dueDateFormat.tooltip, dueDateFormat.tooltipParams)}>
                <Tag
                  color={dueDateFormat.color}
                  icon={dueDateFormat.icon}
                  style={{ fontSize: isXs ? 11 : 12, margin: 0 }}
                >
                  {t(dueDateFormat.text)}
                </Tag>
              </Tooltip>
            )}

            <Tooltip title={t(priorityConfig.label)}>
              <Tag
                color={priorityConfig.color}
                icon={priorityConfig.icon}
                style={{ fontSize: isXs ? 11 : 12, margin: 0 }}
              >
                {isXs ? '' : t(priorityConfig.label)}
              </Tag>
            </Tooltip>
          </div>

          {/* DESCRIPTION - Hidden on xs */}
          {!isXs && task.description && (
            <Paragraph
              type="secondary"
              ellipsis={{ rows: isMd ? 2 : 3 }}
              style={{
                marginTop: 12,
                marginBottom: 0,
                fontSize: isXs ? 12 : 13,
              }}
            >
              {task.description}
            </Paragraph>
          )}

          {/* FOOTER - Date and Actions */}
          <div className="flex justify-between items-center mt-4">
            <Text type="secondary" style={{ fontSize: isXs ? 11 : 12 }}>
              {formatDate(task.createdAt)}
            </Text>

            <Space size={isXs ? 4 : 8} onClick={(e) => e.stopPropagation()}>
              <CreateEditTaskButton
                trigger={
                  <Tooltip title={t('task.editTask')}>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      style={{
                        minWidth: isXs ? 40 : 44,
                        height: isXs ? 40 : 44,
                      }}
                    />
                  </Tooltip>
                }
                initialValues={task}
              />

              <DeleteTaskModal id={task.id} />
            </Space>
          </div>
        </Card>
      </div>

      <TaskDetailsModal
        open={isOpenDetailsModal}
        onClose={() => setIsOpenDetailsModal(false)}
        task={task}
      />
    </>
  );
}

export default memo(Task);
