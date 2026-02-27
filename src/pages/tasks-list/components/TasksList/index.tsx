import { Card, Col, Row, Tabs, Grid, Button } from "antd";
import { TaskStatus } from "@/models";
import { Column, CreateEditTaskButton, StatusBadge } from "@/components";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

export function TasksList() {
  const { t } = useTranslation();
  const screens = useBreakpoint();

  // Mobile view: Tabs for switching between statuses
  const isMobile = !screens.md; // <768px

  if (isMobile) {
    return (
      <Card
        data-tour="tasks-list"
        title={t("tasksList.tasks")}
        extra={
          <CreateEditTaskButton
            trigger={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                data-tour="new-task-button"
              >
                {t("tasksList.newTask")}
              </Button>
            }
          />
        }
        className="flex flex-col flex-1"
        classNames={{ body: "flex flex-col flex-1" }}
      >
        <Tabs
          defaultActiveKey={TaskStatus.PENDING}
          type="card"
          size="small"
          className="flex flex-col flex-1"
          destroyOnHidden
          items={Object.values(TaskStatus).map((status) => ({
            key: status,
            label: <StatusBadge target={status} showText />,
            children: <Column status={status} />,
          }))}
        />
      </Card>
    );
  }

  // Desktop view: 4 columns side by side
  return (
    <Card
      data-tour="tasks-list"
      title={t("tasksList.tasks")}
      extra={
        <CreateEditTaskButton
          trigger={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              data-tour="new-task-button"
            >
              {t("tasksList.newTask")}
            </Button>
          }
        />
      }
      className="flex flex-col flex-1"
      classNames={{ body: "flex flex-col flex-1" }}
    >
      <Row gutter={[16, 16]} className="flex-1">
        {Object.values(TaskStatus).map((status) => (
          <Col key={status} xs={24} sm={12} md={12} lg={6} className="flex">
            <Column status={status} />
          </Col>
        ))}
      </Row>
    </Card>
  );
}
