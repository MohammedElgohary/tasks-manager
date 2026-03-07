import { Card, Typography, Tag, Space, Divider, Flex } from 'antd';
import {
  CheckCircleOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  DragOutlined,
  BarChartOutlined,
  SettingOutlined,
  ImportOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;

const technologies = [
  { name: 'React 19', color: 'blue' },
  { name: 'TypeScript', color: 'cyan' },
  { name: 'Vite', color: 'purple' },
  { name: 'Ant Design', color: 'red' },
  { name: 'Tailwind CSS', color: 'cyan' },
  { name: 'Zustand', color: 'orange' },
  { name: 'React Router', color: 'red' },
  { name: 'React DnD', color: 'green' },
  { name: 'i18next', color: 'blue' },
  { name: 'Day.js', color: 'lime' },
];

const features = [
  {
    icon: <CheckCircleOutlined />,
    title: 'about.features.taskManagement.title',
    description: 'about.features.taskManagement.description',
  },
  {
    icon: <DragOutlined />,
    title: 'about.features.dragDrop.title',
    description: 'about.features.dragDrop.description',
  },
  {
    icon: <ThunderboltOutlined />,
    title: 'about.features.priorities.title',
    description: 'about.features.priorities.description',
  },
  {
    icon: <BarChartOutlined />,
    title: 'about.features.analytics.title',
    description: 'about.features.analytics.description',
  },
  {
    icon: <GlobalOutlined />,
    title: 'about.features.i18n.title',
    description: 'about.features.i18n.description',
  },
  {
    icon: <BgColorsOutlined />,
    title: 'about.features.theming.title',
    description: 'about.features.theming.description',
  },
  {
    icon: <DatabaseOutlined />,
    title: 'about.features.localStorage.title',
    description: 'about.features.localStorage.description',
  },
  {
    icon: <ImportOutlined />,
    title: 'about.features.importExport.title',
    description: 'about.features.importExport.description',
  },
  {
    icon: <SettingOutlined />,
    title: 'about.features.filters.title',
    description: 'about.features.filters.description',
  },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Card>
        <Space vertical size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>{t('about.title')}</Title>
            <Paragraph>{t('about.description')}</Paragraph>
          </div>

          <Divider className="!m-0" />

          <Space vertical size="middle">
            <Title level={3}>{t('about.technologiesTitle')}</Title>
            <Space size={[8, 8]} wrap>
              {technologies.map((tech) => (
                <Tag key={tech.name} color={tech.color}>
                  {tech.name}
                </Tag>
              ))}
            </Space>
          </Space>

          <Divider className="!m-0" />

          <Space vertical size="middle">
            <Title level={3}>{t('about.featuresTitle')}</Title>

            <Space vertical size="middle" className="w-full">
              {features.map((feature, index) => (
                <Card key={index} size="small" type="inner">
                  <Space>
                    <Text style={{ fontSize: '20px' }}>{feature.icon}</Text>

                    <Flex vertical>
                      <Text strong>{t(feature.title)}</Text>
                      <Text type="secondary">{t(feature.description)}</Text>
                    </Flex>
                  </Space>
                </Card>
              ))}
            </Space>
          </Space>

          <Divider className="!m-0" />

          <Space vertical size="middle">
            <Title level={3}>{t('about.architectureTitle')}</Title>
            <Space vertical size="small">
              <Paragraph>
                <Text strong>{t('about.architecture.stateManagement')}</Text>{' '}
                {t('about.architecture.stateManagementDesc')}
              </Paragraph>
              <Paragraph>
                <Text strong>{t('about.architecture.routing')}</Text>{' '}
                {t('about.architecture.routingDesc')}
              </Paragraph>
              <Paragraph>
                <Text strong>{t('about.architecture.ui')}</Text> {t('about.architecture.uiDesc')}
              </Paragraph>
              <Paragraph>
                <Text strong>{t('about.architecture.dnd')}</Text> {t('about.architecture.dndDesc')}
              </Paragraph>
              <Paragraph>
                <Text strong>{t('about.architecture.validation')}</Text>{' '}
                {t('about.architecture.validationDesc')}
              </Paragraph>
            </Space>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
