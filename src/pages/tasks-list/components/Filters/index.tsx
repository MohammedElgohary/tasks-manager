import { Card, Flex, Input, Button } from "antd";
import { PrioritySelect, StatusSelect } from "@/components";
import { useTasksStore } from "@/stores";
import { ClearOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useTasksUrlFilters } from "@/hooks";

export function Filters() {
  const { t } = useTranslation();

  const changeFilters = useTasksStore((state) => state.changeFilters);
  const filters = useTasksStore((state) => state.filters);

  useTasksUrlFilters();

  return (
    <Card data-tour="filters">
      <Flex gap="small" wrap>
        <Input.Search
          placeholder={t("common.search")}
          value={filters.search}
          onChange={(event) =>
            changeFilters({
              ...filters,
              search: event.target.value || undefined,
            })
          }
          className="flex-5 min-w-[250px]"
        />

        <StatusSelect
          placeholder={t("task.status")}
          value={filters.status}
          onChange={(value) => changeFilters({ ...filters, status: value })}
          className="flex-1 min-w-[200px]"
        />

        <PrioritySelect
          placeholder={t("task.priority")}
          value={filters.priority}
          onChange={(value) => changeFilters({ ...filters, priority: value })}
          className="flex-1 min-w-[200px]"
        />

        <Button
          onClick={() => changeFilters({})}
          disabled={Object.values(filters).every((value) => !value)}
          icon={<ClearOutlined />}
          className="flex-1 min-w-[120px]"
        >
          {t("common.clear")}
        </Button>
      </Flex>
    </Card>
  );
}
