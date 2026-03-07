import { Modal, Space, Typography } from 'antd';
import { LanguageSelect, PrimaryColor, ThemeSelect } from '@/components';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={t('common.settings')}
      footer={null}
      centered
      width={300}
    >
      <Space orientation="vertical" className="w-full" size="middle">
        <Space orientation="vertical" className="w-full">
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {t('common.language')}
          </Typography.Text>
          <LanguageSelect />
        </Space>

        <Space orientation="vertical" className="w-full">
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {t('common.primaryColor')}
          </Typography.Text>
          <PrimaryColor />
        </Space>

        <Space orientation="vertical" className="w-full">
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {t('common.theme')}
          </Typography.Text>
          <ThemeSelect />
        </Space>
      </Space>
    </Modal>
  );
}

export default memo(SettingsModal);
