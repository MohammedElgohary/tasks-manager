import { TaskPriority, TaskStatus } from '@/models';
import {
  ExclamationCircleOutlined,
  FireOutlined,
  FlagOutlined,
  PauseOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

export const statusToColor: Record<TaskStatus, string> = {
  [TaskStatus.ON_HOLD]: '#8b8b8b',
  [TaskStatus.PENDING]: '#faad14',
  [TaskStatus.IN_PROGRESS]: '#1677ff',
  [TaskStatus.COMPLETED]: '#52c41a',
};

export const statusToIcon: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.ON_HOLD]: <PauseOutlined />,
  [TaskStatus.PENDING]: <ClockCircleOutlined />,
  [TaskStatus.IN_PROGRESS]: <SyncOutlined />,
  [TaskStatus.COMPLETED]: <CheckCircleOutlined />,
};

export const priorityToColor: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: '#95de64',
  [TaskPriority.MEDIUM]: '#ffd666',
  [TaskPriority.HIGH]: '#ff9c6e',
  [TaskPriority.CRITICAL]: '#ff4d4f',
};

export const priorityToIcon: Record<TaskPriority, React.ReactNode> = {
  [TaskPriority.LOW]: <FlagOutlined />,
  [TaskPriority.MEDIUM]: <FlagOutlined />,
  [TaskPriority.HIGH]: <ExclamationCircleOutlined />,
  [TaskPriority.CRITICAL]: <FireOutlined />,
};

export const prioritiesMap: Record<
  TaskPriority,
  { icon: React.ReactNode; label: string; color: string }
> = {
  [TaskPriority.LOW]: {
    icon: priorityToIcon[TaskPriority.LOW],
    color: priorityToColor[TaskPriority.LOW],
    label: 'priority.LOW',
  },
  [TaskPriority.MEDIUM]: {
    icon: priorityToIcon[TaskPriority.MEDIUM],
    color: priorityToColor[TaskPriority.MEDIUM],
    label: 'priority.MEDIUM',
  },
  [TaskPriority.HIGH]: {
    icon: priorityToIcon[TaskPriority.HIGH],
    color: priorityToColor[TaskPriority.HIGH],
    label: 'priority.HIGH',
  },
  [TaskPriority.CRITICAL]: {
    icon: priorityToIcon[TaskPriority.CRITICAL],
    color: priorityToColor[TaskPriority.CRITICAL],
    label: 'priority.CRITICAL',
  },
} as const;

export const statusesMapper: Record<
  TaskStatus,
  { icon: React.ReactNode; label: string; color: string }
> = {
  [TaskStatus.ON_HOLD]: {
    icon: statusToIcon[TaskStatus.ON_HOLD],
    color: statusToColor[TaskStatus.ON_HOLD],
    label: 'status.ON_HOLD',
  },
  [TaskStatus.PENDING]: {
    icon: statusToIcon[TaskStatus.PENDING],
    color: statusToColor[TaskStatus.PENDING],
    label: 'status.PENDING',
  },
  [TaskStatus.IN_PROGRESS]: {
    icon: statusToIcon[TaskStatus.IN_PROGRESS],
    color: statusToColor[TaskStatus.IN_PROGRESS],
    label: 'status.IN_PROGRESS',
  },
  [TaskStatus.COMPLETED]: {
    icon: statusToIcon[TaskStatus.COMPLETED],
    color: statusToColor[TaskStatus.COMPLETED],
    label: 'status.COMPLETED',
  },
} as const;
