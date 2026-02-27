import { App, Button, Dropdown, Grid } from "antd";
import {
  DownOutlined,
  SettingOutlined,
  DownloadOutlined,
  UploadOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { MenuProps } from "antd";
import { memo, useCallback, useRef, useState } from "react";
import { SettingsModal } from "@/components";
import {
  exportTasksToJSON,
  importTasksFromJSON,
  type ValidationResult,
} from "@/utils";
import { useTasksStore } from "@/stores";
import { requestImportTasks } from "@/network";
import { ImportMode, type Task } from "@/models";

const { useBreakpoint } = Grid;

function ActionsDropdown() {
  const { t } = useTranslation();
  const { message, modal } = App.useApp();

  const screens = useBreakpoint();

  const isXs = screens.xs && !screens.sm;

  const tasks = useTasksStore((state) => state.tasks);
  const refreshTasks = useTasksStore((state) => state.refreshTasks);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Settings modal callbacks
  const onOpenSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const onCloseSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  // Export tasks callback
  function onExportTasks() {
    if (tasks.length === 0) {
      message.warning(t("importExport.noTasksToExport"));
      return;
    }

    try {
      const timestamp = new Date().toISOString().split("T")[0];
      exportTasksToJSON(tasks, `tasks-${timestamp}.json`);
      message.success(t("importExport.exportSuccess"));
    } catch (error) {
      console.error(error);
      message.error(t("importExport.exportError"));
    }
  }

  // Import tasks callbacks
  function onImportTasks() {
    fileInputRef.current?.click();
  }

  // Download template callback
  async function onDownloadTemplate() {
    try {
      const response = await fetch("/templates/tasks-template.json");
      const templateData = await response.json();

      const dataStr = JSON.stringify(templateData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "tasks-template.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      message.success(t("importExport.templateDownloadSuccess"));
    } catch (error) {
      console.error(error);
      message.error(t("importExport.templateDownloadError"));
    }
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const validationResult = await importTasksFromJSON(file);

      // Show validation report if there are errors
      if (!validationResult.isValid) {
        showValidationReport(validationResult);
        return;
      }

      if (validationResult.validTasks.length === 0) {
        message.warning(t("importExport.noTasksInFile"));
        return;
      }

      modal.confirm({
        title: t("importExport.importConfirmTitle"),
        centered: true,
        width: 550,
        content: t("importExport.importConfirmContent", {
          count: validationResult.validTasks.length,
        }),
        okText: t("importExport.merge"),
        cancelText: t("importExport.replace"),
        onOk: async () => {
          await handleImport(validationResult.validTasks, ImportMode.MERGE);
        },
        onCancel: async () => {
          await handleImport(validationResult.validTasks, ImportMode.REPLACE);
        },
      });
    } catch (error) {
      console.error(error);
      message.error(
        error instanceof Error ? error.message : t("importExport.importError"),
      );
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function showValidationReport(result: ValidationResult) {
    const errorsByTask = new Map<number, typeof result.errors>();

    result.errors.forEach((error) => {
      if (!errorsByTask.has(error.taskIndex)) {
        errorsByTask.set(error.taskIndex, []);
      }
      errorsByTask.get(error.taskIndex)!.push(error);
    });

    const errorList = Array.from(errorsByTask.entries())
      .map(([taskIndex, errors]) => {
        const taskTitle =
          errors[0].taskTitle ||
          t("importExport.validationTaskFallback", { index: taskIndex });
        const errorMessages = errors.map((e) => `  • ${e.field}: ${e.message}`);
        return t("importExport.validationTaskError", {
          index: taskIndex + 1,
          title: taskTitle,
          errors: errorMessages.join("\n"),
        });
      })
      .join("\n\n");

    modal.error({
      title: t("importExport.validationFailedTitle"),
      centered: true,
      width: 650,
      content: (
        <div>
          <p>
            {t("importExport.validationFailedMessage", {
              errorCount: result.errors.length,
              invalidCount: result.invalidTasksCount,
              totalCount: result.totalTasks,
            })}
          </p>
          <pre
            style={{
              maxHeight: "400px",
              overflow: "auto",
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "4px",
              fontSize: "12px",
              whiteSpace: "pre-wrap",
            }}
          >
            {errorList}
          </pre>
        </div>
      ),
    });
  }

  async function handleImport(importedTasks: Array<Task>, mode: ImportMode) {
    try {
      await requestImportTasks(importedTasks, mode);
      await refreshTasks();
      message.success(
        t(
          mode === ImportMode.MERGE
            ? "importExport.importMergeSuccess"
            : "importExport.importReplaceSuccess",
        ),
      );
    } catch (error) {
      console.error(error);
      message.error(t("importExport.importError"));
    }
  }

  const items: MenuProps["items"] = [
    {
      key: "settings",
      label: t("common.settings"),
      icon: <SettingOutlined />,
      onClick: onOpenSettings,
    },
    {
      type: "divider",
    },
    {
      key: "template",
      label: t("importExport.downloadTemplate"),
      icon: <FileTextOutlined />,
      onClick: onDownloadTemplate,
    },
    {
      key: "export",
      label: t("importExport.export"),
      icon: <DownloadOutlined />,
      onClick: onExportTasks,
    },
    {
      key: "import",
      label: t("importExport.import"),
      icon: <UploadOutlined />,
      onClick: onImportTasks,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button
          size={isXs ? "middle" : "large"}
          icon={<DownOutlined />}
          iconPlacement="end"
          data-tour="actions-dropdown"
        >
          {t("common.actions")}
        </Button>
      </Dropdown>

      <SettingsModal
        open={isSettingsOpen}
        onClose={onCloseSettings}
        data-tour="settings-button"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}

export default memo(ActionsDropdown);
