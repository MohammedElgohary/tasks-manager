import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
import { App as AntApp, Layout, ConfigProvider, theme } from "antd";
import enUS from "antd/es/locale/en_US";
import arEG from "antd/es/locale/ar_EG";
import "./index.css";
import TasksManagerApp from "./app.tsx";
import "antd/dist/reset.css";
import { useSettingsStore } from "./stores";
import { Theme, Language } from "./models";
import "./i18n";
import { Loader } from "./components/index.ts";
import { useTranslation } from "react-i18next";

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

export function Root() {
  const { ready } = useTranslation();
  const appTheme = useSettingsStore((settings) => settings.theme);
  const colorPrimary = useSettingsStore((settings) => settings.colorPrimary);
  const language = useSettingsStore((settings) => settings.language);

  if (!ready) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary,
          },
          algorithm:
            appTheme === Theme.DARK
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
        componentSize={"large"}
        locale={language === Language.ARABIC ? arEG : enUS}
        direction={language === Language.ARABIC ? "rtl" : "ltr"}
      >
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <Layout>
            <Layout.Content>
              <AntApp>
                <TasksManagerApp />
              </AntApp>
            </Layout.Content>
          </Layout>
        </DndProvider>
      </ConfigProvider>
    </Suspense>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
