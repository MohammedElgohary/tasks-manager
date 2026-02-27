import { Switch, Tooltip } from "antd";
import { useSettingsStore } from "@/stores";
import { Theme } from "@/models";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export function ThemeSwitch() {
  const { t } = useTranslation();

  const theme = useSettingsStore((state) => state.theme);
  const changeTheme = useSettingsStore((state) => state.setTheme);

  const isDark = theme === Theme.DARK;

  function handleChangeTheme() {
    changeTheme(isDark ? Theme.LIGHT : Theme.DARK);
  }

  return (
    <Tooltip title={t(isDark ? "theme.switchToLight" : "theme.switchToDark")}>
      <Switch
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        checked={isDark}
        onChange={handleChangeTheme}
        className="w-full"
      />
    </Tooltip>
  );
}
