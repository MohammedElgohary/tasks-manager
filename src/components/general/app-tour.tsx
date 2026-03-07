import { Tour, type TourProps, Button, Tooltip, Grid } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState, useMemo } from 'react';
const TOUR_COMPLETED_KEY = 'app-tour-completed';

const { useBreakpoint } = Grid;

interface AppTourProps {
  onStartTour?: () => void;
}

export function AppTour({ onStartTour }: AppTourProps = {}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const tourShownRef = useRef(false);
  const screens = useBreakpoint();

  useEffect(() => {
    // Check if tour has been completed before
    const tourCompleted = localStorage.getItem(TOUR_COMPLETED_KEY);

    // Show tour only once per session if not completed and translations are ready
    if (!tourCompleted && !tourShownRef.current) {
      // Small delay to ensure DOM elements are rendered
      const timer = setTimeout(() => {
        setOpen(true);
        tourShownRef.current = true;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  function handleStartTour() {
    setOpen(true);
    onStartTour?.();
  }

  function handleClose() {
    setOpen(false);
    localStorage.setItem(TOUR_COMPLETED_KEY, 'true');
  }

  // Use useMemo to recalculate steps when language changes

  const steps: TourProps['steps'] = useMemo(
    () => [
      {
        title: t('tour.welcome.title'),
        description: t('tour.welcome.description'),
        target: null,
      },
      {
        title: t('tour.newTask.title'),
        description: t('tour.newTask.description'),
        target: () =>
          document.querySelector<HTMLElement>('[data-tour="new-task-button"]') as HTMLElement,
      },
      {
        title: t('tour.filters.title'),
        description: t('tour.filters.description'),
        target: () => document.querySelector<HTMLElement>('[data-tour="filters"]') as HTMLElement,
      },
      {
        title: t('tour.taskColumns.title'),
        description: t('tour.taskColumns.description'),
        target: () =>
          document.querySelector<HTMLElement>('[data-tour="tasks-list"]') as HTMLElement,
      },
      {
        title: t('tour.taskCard.title'),
        description: t('tour.taskCard.description'),
        target: () => document.querySelector<HTMLElement>('[data-tour="task-card"]') as HTMLElement,
      },
      {
        title: t('tour.dragDrop.title'),
        description: t('tour.dragDrop.description'),
        target: () => document.querySelector<HTMLElement>('[data-tour="task-card"]') as HTMLElement,
      },
      {
        title: t('tour.actions.title'),
        description: t('tour.actions.description'),
        target: () =>
          document.querySelector<HTMLElement>('[data-tour="actions-dropdown"]') as HTMLElement,
      },
      {
        title: t('tour.settings.title'),
        description: t('tour.settings.description'),
        target: () =>
          document.querySelector<HTMLElement>('[data-tour="settings-button"]') as HTMLElement,
        placement: 'bottomRight',
      },
    ],
    [t]
  );

  function handleStepChange(current: number) {
    // Scroll to element with offset for fixed menu
    const step = steps?.[current];
    if (step && typeof step.target === 'function') {
      const element = step.target();
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const offset = 80; // Fixed menu height + some padding
        const scrollTop = window.pageYOffset + elementRect.top - offset;

        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      }
    }
  }

  const isXs = screens.xs && !screens.sm;

  return (
    <>
      <Tooltip title={t('tour.startTour')}>
        <Button
          size={isXs ? 'middle' : 'large'}
          type="dashed"
          icon={<QuestionCircleOutlined />}
          onClick={handleStartTour}
          data-tour="help-button"
        />
      </Tooltip>
      <Tour
        open={open}
        onClose={handleClose}
        steps={steps}
        onChange={handleStepChange}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
    </>
  );
}
