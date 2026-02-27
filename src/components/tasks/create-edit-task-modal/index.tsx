import { cloneElement, useId, useState, useEffect, memo } from "react";
import { Button, DatePicker, Flex, Form, Input, Modal, App } from "antd";
import { TaskPriority, TaskStatus } from "@/models";
import { requestAddTask, requestUpdateTask } from "@/network";
import type {
  CreateEditTaskButtonProps,
  CreateEditTaskModalProps,
  FormValues,
} from "./interface";
import dayjs from "dayjs";
import { PrioritySelect, StatusSelect } from "@/components";
import { useTranslation } from "react-i18next";
import { useTasksStore } from "@/stores";

function CreateEditTaskButton({
  trigger,
  initialValues,
}: CreateEditTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const { refreshTasks: refresh } = useTasksStore();

  return (
    <>
      {cloneElement(trigger, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
          event.stopPropagation();

          setOpen(true);
        },
      })}

      {open && (
        <CreateEditTaskModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            refresh();
            setOpen(false);
          }}
          initialValues={initialValues}
        />
      )}
    </>
  );
}

export default memo(CreateEditTaskButton);

const INITIAL_VALUES: FormValues = {
  title: "",
  description: "",
  status: TaskStatus.PENDING,
  priority: TaskPriority.LOW,
  dueDate: null,
};

function CreateEditTaskModal({
  open,
  onClose,
  onSuccess,
  initialValues,
}: CreateEditTaskModalProps) {
  const FORM_ID = useId();
  const { t } = useTranslation();

  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();

  async function onFinish(values: FormValues): Promise<void> {
    const isEditing = !!initialValues?.id;

    try {
      if (isEditing) {
        await requestUpdateTask(initialValues.id, values);
      } else {
        await requestAddTask(values);
      }

      form.resetFields();

      onSuccess?.();

      message.success(
        isEditing ? t("taskModal.updateSuccess") : t("taskModal.createSuccess"),
      );
    } catch (error) {
      console.error(error);
      message.error(
        isEditing ? t("taskModal.updateError") : t("taskModal.createError"),
      );
    }
  }

  useEffect(() => {
    if (!initialValues) return;

    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        initialValues ? t("taskModal.editTitle") : t("taskModal.createTitle")
      }
      centered
      footer={
        <Flex justify="end" gap="small">
          <Button onClick={onClose}>{t("common.cancel")}</Button>

          <Button type="primary" htmlType="submit" form={FORM_ID}>
            {initialValues
              ? t("taskModal.updateButton")
              : t("taskModal.createButton")}
          </Button>
        </Flex>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        id={FORM_ID}
        initialValues={INITIAL_VALUES}
      >
        <Flex vertical>
          <Form.Item
            name="title"
            label={t("task.title")}
            rules={[
              { required: true, message: t("taskModal.titleRequired") },
              { whitespace: true, message: t("taskModal.titleRequired") },
              { min: 3, message: t("taskModal.titleMinLength") },
              { max: 100, message: t("taskModal.titleMaxLength") },
            ]}
          >
            <Input
              placeholder={t("taskModal.titlePlaceholder")}
              maxLength={100}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={t("task.description")}
            rules={[
              {
                max: 500,
                message: t("taskModal.descriptionMaxLength"),
              },
            ]}
          >
            <Input.TextArea
              rows={5}
              placeholder={t("taskModal.descriptionPlaceholder")}
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Flex gap="small">
            <Form.Item
              name="status"
              label={t("task.status")}
              className="flex-1"
            >
              <StatusSelect placeholder={t("taskModal.statusPlaceholder")} />
            </Form.Item>

            <Form.Item
              name="priority"
              label={t("task.priority")}
              className="flex-1"
            >
              <PrioritySelect
                placeholder={t("taskModal.priorityPlaceholder")}
              />
            </Form.Item>
          </Flex>

          <Form.Item
            name="dueDate"
            label={t("task.dueDate")}
            className="flex-1"
            getValueProps={(value: string | null) => ({
              value: value ? dayjs(value) : null,
            })}
            getValueFromEvent={(date: dayjs.Dayjs | null) =>
              date ? date.toISOString() : null
            }
          >
            <DatePicker
              placeholder={t("taskModal.dueDatePlaceholder")}
              format="YYYY-MM-DD"
              className="w-full"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
}
