import { Col, Row, Tabs, Grid, FloatButton, Card } from 'antd';
import { TaskStatus } from '@/models';
import { Column, CreateEditTaskButton, StatusBadge } from '@/components';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { memo, useMemo } from 'react';
import { useActiveTab } from '@/hooks';

const { useBreakpoint } = Grid;

const NewTaskFloatButton = memo(() => {
  const { t } = useTranslation();

  return (
    <CreateEditTaskButton
      trigger={
        <FloatButton
          type="primary"
          icon={<PlusOutlined />}
          data-tour="new-task-button"
          tooltip={t('tasksList.newTask')}
          className="pulse-button"
        />
      }
    />
  );
});

const MobileTasksList = memo(() => {
  const { activeTab, setActiveTab } = useActiveTab();

  const tabOptions = useMemo(
    () =>
      Object.values(TaskStatus).map((status) => ({
        key: status,
        label: <StatusBadge target={status} showText />,
        children: <Column status={status} />,
      })),
    []
  );

  return (
    <Card className="flex flex-col flex-1" data-tour="tasks-list">
      <Tabs
        defaultActiveKey={TaskStatus.PENDING}
        activeKey={activeTab}
        type="card"
        size="small"
        className="flex flex-col flex-1"
        destroyOnHidden
        items={tabOptions}
        onChange={(value) => setActiveTab(value as TaskStatus)}
      />
      <NewTaskFloatButton />
    </Card>
  );
});

const DesktopTasksList = memo(() => {
  const columns = useMemo(
    () =>
      Object.values(TaskStatus).map((status) => (
        <Col key={status} xs={24} sm={12} md={12} lg={6} className="flex">
          <Column status={status} />
        </Col>
      )),
    []
  );

  return (
    <div className="flex flex-col flex-1" data-tour="tasks-list">
      <Row gutter={[16, 16]} className="flex-1">
        {columns}
      </Row>
      <NewTaskFloatButton />
    </div>
  );
});

export const TasksList = memo(() => {
  const screens = useBreakpoint();
  const isMobile = !screens.md; // <768px

  return isMobile ? <MobileTasksList /> : <DesktopTasksList />;
});
