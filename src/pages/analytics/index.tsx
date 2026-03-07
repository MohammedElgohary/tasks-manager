import { Card, Col, Row, Statistic, Progress, Empty, Typography } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAnalyticsStore, useSettingsStore } from '@/stores';
import { memo, useEffect } from 'react';
import { statusToColor } from '@/utils';
import { TaskStatus } from '@/models';
import { Loader } from '@/components';
import { Link } from 'react-router-dom';
import { StatusTaskCard, PriorityTaskCard } from './components';

function Analytics() {
  const { t } = useTranslation();
  const colorPrimary = useSettingsStore((settings) => settings.colorPrimary);

  const isLoading = useAnalyticsStore((analytics) => analytics.isLoading);
  const analytics = useAnalyticsStore((analytics) => analytics.analytics);
  const fetchAnalytics = useAnalyticsStore((analytics) => analytics.fetchAnalytics);

  useEffect(() => {
    const abortController = new AbortController();

    void fetchAnalytics();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !analytics) {
    return <Loader />;
  }

  if (analytics.total === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{t('analytics.title')}</h1>
        <Empty description={t('analytics.noData')} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Typography.Title level={2} className="mb-6">
        {t('analytics.title')}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('analytics.totalTasks')}
              value={analytics.total}
              styles={{
                content: { color: colorPrimary },
              }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Link to={`/?status=${TaskStatus.COMPLETED}`} style={{ display: 'block' }}>
            <Card hoverable>
              <Statistic
                title={t('analytics.completedTasks')}
                value={analytics.statuses[TaskStatus.COMPLETED]}
                prefix={<CheckCircleOutlined />}
                styles={{
                  content: { color: statusToColor[TaskStatus.COMPLETED] },
                }}
              />
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Link to={`/?status=${TaskStatus.IN_PROGRESS}`} style={{ display: 'block' }}>
            <Card hoverable>
              <Statistic
                title={t('analytics.inProgressTasks')}
                value={analytics.statuses[TaskStatus.IN_PROGRESS]}
                prefix={<SyncOutlined />}
                styles={{
                  content: { color: statusToColor[TaskStatus.IN_PROGRESS] },
                }}
              />
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Link to="/?isOverdue=true" style={{ display: 'block' }}>
            <Card hoverable>
              <Statistic
                title={t('analytics.overdueTasks')}
                value={analytics.overdue}
                prefix={<ClockCircleOutlined />}
                styles={{
                  content: { color: '#ff4d4f' },
                }}
              />
            </Card>
          </Link>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} md={24} lg={24}>
          <Card title={t('analytics.completionRate')}>
            <Progress
              percent={analytics.completionRate}
              status={analytics.completionRate === 100 ? 'success' : 'active'}
              strokeColor={{
                '0%': '#ab0c88',
                '100%': colorPrimary,
              }}
            />
          </Card>
        </Col>

        <Col xs={24} md={12} lg={12}>
          <StatusTaskCard analytics={analytics} />
        </Col>

        <Col xs={24} md={12} lg={12}>
          <PriorityTaskCard analytics={analytics} />
        </Col>
      </Row>
    </div>
  );
}

export default memo(Analytics);
