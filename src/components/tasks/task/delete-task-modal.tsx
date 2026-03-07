import { App, Button, Tooltip, Grid } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { requestDeleteTask } from '@/network';
import { useTranslation } from 'react-i18next';
import { useTasksStore } from '@/stores';
import { memo } from 'react';

const { useBreakpoint } = Grid;

interface DeleteTaskModalProps {
  id: string;
}

function DeleteTaskModal({ id }: DeleteTaskModalProps) {
  const { message, modal } = App.useApp();
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const { refreshTasks: refresh } = useTasksStore();

  const isXs = screens.xs && !screens.sm;

  function confirmRemoveTask() {
    modal.confirm({
      title: t('deleteModal.title'),
      content: t('deleteModal.content'),
      centered: true,
      onOk: async () => {
        await requestDeleteTask(id);
        message.success(t('deleteModal.success'));
        refresh();
      },
      okText: t('common.remove'),
      cancelText: t('common.cancel'),
      okButtonProps: {
        danger: true,
      },
    });
  }

  return (
    <Tooltip title={t('task.deleteTask')}>
      <Button
        danger
        type="text"
        icon={<DeleteOutlined />}
        onClick={confirmRemoveTask}
        style={{
          minWidth: isXs ? 40 : 44,
          height: isXs ? 40 : 44,
        }}
      />
    </Tooltip>
  );
}

export default memo(DeleteTaskModal);
