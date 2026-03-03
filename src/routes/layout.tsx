import { memo, Suspense, useTransition } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  UnorderedListOutlined,
  BarChartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Loader } from "@/components";

function Layout() {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split("/")[1];

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[currentPath]}
        className="fixed-menu"
        items={[
          {
            key: "",
            icon: <UnorderedListOutlined />,
            label: t("tasksList.title"),
            disabled: isPending,
            onClick: () => startTransition(() => navigate("/")),
          },
          {
            key: "analytics",
            icon: <BarChartOutlined />,
            label: t("analytics.title"),
            disabled: isPending,
            onClick: () => startTransition(() => navigate("/analytics")),
          },
          {
            key: "about",
            icon: <InfoCircleOutlined />,
            label: t("about.title"),
            disabled: isPending,
            onClick: () => startTransition(() => navigate("/about")),
          },
        ]}
      />

      <div className="content-with-fixed-menu">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

export default memo(Layout);
