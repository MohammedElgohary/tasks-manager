import { Typography, Flex, Grid, Tooltip, App } from 'antd';
import { Filters, TasksList } from './components';
import { useTranslation } from 'react-i18next';
import { LanguageSelect, ThemeSelect, AppTour, ActionsDropdown } from '@/components';
import { useTasksStore } from '@/stores';
import { memo, useEffect, useMemo } from 'react';

const { useBreakpoint } = Grid;

function TasksListPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const screens = useBreakpoint();

  const error = useTasksStore((state) => state.error);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  useEffect(() => {
    const abortController = new AbortController();

    void fetchTasks();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!error) return;

    console.error(error);
    message.error(t('tasksList.failedToFetch'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // Memoize responsive breakpoints
  const { isXs, isSm, isMd } = useMemo(
    () => ({
      isXs: screens.xs && !screens.sm,
      isSm: screens.sm && !screens.md,
      isMd: screens.md && !screens.lg,
    }),
    [screens.xs, screens.sm, screens.md, screens.lg]
  );

  // Gradual title size scale
  const titleLevel = useMemo(() => (isXs ? 4 : isSm ? 3 : isMd ? 2 : 1), [isMd, isSm, isXs]);

  return (
    <Flex vertical className="gap-4 page">
      <Flex justify="space-between" align="center" wrap gap={8}>
        <Typography.Title level={titleLevel} className="m-0">
          {t('tasksList.title')}
        </Typography.Title>

        <Flex align="center" gap={8}>
          <AppTour />

          {!isSm && !isXs && (
            <>
              <Tooltip title={t('common.theme')}>
                <span>
                  <ThemeSelect />
                </span>
              </Tooltip>

              <Tooltip title={t('common.language')}>
                <span>
                  <LanguageSelect />
                </span>
              </Tooltip>
            </>
          )}

          <ActionsDropdown />
        </Flex>
      </Flex>

      <Filters />

      <TasksList />
    </Flex>
  );
}

export default memo(TasksListPage);
