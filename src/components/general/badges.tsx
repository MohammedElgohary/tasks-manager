import { TaskPriority, TaskStatus } from '@/models';
import { prioritiesMap, priorityToColor, statusToColor, statusToIcon } from '@/utils';
import { Space, Typography } from 'antd';
import { cloneElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface BaseBadgeProps<T extends TaskStatus | TaskPriority> {
  showText?: boolean;
  target: T;
  source: Record<T, string>;
  translationKey: 'status' | 'priority';
  icon: React.ReactNode;
}

function BaseBadge<T extends TaskStatus | TaskPriority>({
  target,
  source,
  showText = false,
  translationKey,
  icon,
}: BaseBadgeProps<T>) {
  const { t } = useTranslation();

  const iconElement = useMemo(
    () =>
      cloneElement(
        icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
        {
          style: {
            color: source[target],
          },
        } as React.SVGProps<SVGSVGElement>
      ),
    [icon, source, target]
  );

  return showText ? (
    <Space>
      {iconElement}
      <Typography.Text>{t(`${translationKey}.${target}`)}</Typography.Text>
    </Space>
  ) : (
    iconElement
  );
}

export function StatusBadge(
  props: Omit<BaseBadgeProps<TaskStatus>, 'source' | 'translationKey' | 'icon'>
) {
  return (
    <BaseBadge
      source={statusToColor}
      translationKey="status"
      icon={statusToIcon[props.target]}
      {...props}
    />
  );
}

export function PriorityBadge(
  props: Omit<BaseBadgeProps<TaskPriority>, 'source' | 'translationKey' | 'icon'>
) {
  return (
    <BaseBadge
      source={priorityToColor}
      translationKey="priority"
      icon={prioritiesMap[props.target].icon}
      {...props}
    />
  );
}
