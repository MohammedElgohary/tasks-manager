import {
  Modal,
  Typography,
  Tag,
  Descriptions,
  Divider,
  Flex,
  Space,
  Alert,
} from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import type { Task } from "@/models";
import {
  formatDate,
  formatDateTime,
  formatDueDate,
  prioritiesMap,
  statusToColor,
  statusToIcon,
} from "@/utils";
import { useTranslation } from "react-i18next";
import { memo } from "react";

interface TaskDetailsModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

function TaskDetailsModal({ open, onClose, task }: TaskDetailsModalProps) {
  const { t } = useTranslation();

  if (!task) return null;

  const priorityConfig = prioritiesMap[task.priority];
  const dueDateFormat = formatDueDate(task.dueDate, task.status);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      centered
      title={
        <Flex align="center" gap={8} wrap="wrap">
          <Typography.Title level={4} className="!mb-0 !me-[24px]">
            {task.title}
          </Typography.Title>

          <Space size={4}>
            <Tag
              color={statusToColor[task.status]}
              icon={statusToIcon[task.status]}
            >
              {t(`status.${task.status}`)}
            </Tag>

            <Tag color={priorityConfig.color} icon={priorityConfig.icon}>
              {t(priorityConfig.label)}
            </Tag>
          </Space>
        </Flex>
      }
    >
      <Space orientation="vertical">
        {/* Due Date Alert */}
        {dueDateFormat && (
          <Alert
            type={dueDateFormat.type}
            title={t(dueDateFormat.text)}
            description={t(dueDateFormat.tooltip, dueDateFormat.tooltipParams)}
            icon={dueDateFormat.icon}
            showIcon
            className="!mt-2"
          />
        )}

        {/* Description */}
        <Space orientation="vertical">
          <Typography.Text type="secondary" strong>
            {t("task.description")}
          </Typography.Text>

          <Typography.Paragraph className="!mb-0">
            {task.description || t("task.noDescription")}
          </Typography.Paragraph>
        </Space>

        <Divider className="!my-2" />

        {/* Metadata Section */}
        <Descriptions column={1} labelStyle={{ fontWeight: 500 }}>
          <Descriptions.Item
            label={
              <Space>
                {priorityConfig.icon}
                {t("task.priority")}
              </Space>
            }
          >
            <Tag color={priorityConfig.color} icon={priorityConfig.icon}>
              {t(priorityConfig.label)}
            </Tag>
          </Descriptions.Item>

          {task.dueDate && (
            <Descriptions.Item
              label={
                <Space>
                  <CalendarOutlined />
                  {t("task.dueDate")}
                </Space>
              }
            >
              {formatDate(task.dueDate)}
            </Descriptions.Item>
          )}

          <Descriptions.Item
            label={
              <Space>
                <ClockCircleOutlined />
                {t("task.createdAt")}
              </Space>
            }
          >
            {formatDateTime(task.createdAt)}
          </Descriptions.Item>

          {task.updatedAt && (
            <Descriptions.Item
              label={
                <Space>
                  <ClockCircleOutlined />
                  {t("task.updatedAt")}
                </Space>
              }
            >
              {formatDateTime(task.updatedAt)}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Space>
    </Modal>
  );
}

export default memo(TaskDetailsModal);
