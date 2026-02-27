import { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  UnorderedListOutlined,
  BarChartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Loader } from "@/components";

export function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split("/")[1];

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[currentPath]}
        items={[
          {
            key: "",
            icon: <UnorderedListOutlined />,
            label: t("tasksList.title"),
            onClick: () => navigate("/"),
          },
          {
            key: "analytics",
            icon: <BarChartOutlined />,
            label: t("analytics.title"),
            onClick: () => navigate("/analytics"),
          },
          {
            key: "about",
            icon: <InfoCircleOutlined />,
            label: t("about.title"),
            onClick: () => navigate("/about"),
          },
        ]}
      />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
