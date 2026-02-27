import type { Task } from "@/models";

export type CreateEditTaskButtonProps = {
  trigger: React.ReactElement<{
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
  }>;
  initialValues?: Task;
};

export type CreateEditTaskModalProps = Pick<
  CreateEditTaskButtonProps,
  "initialValues"
> & {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export type FormValues = Pick<
  Task,
  "title" | "description" | "status" | "dueDate" | "priority"
>;
