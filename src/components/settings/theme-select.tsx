import { useSettingsStore } from '@/stores';
import { Theme } from '@/models';
import { Segmented } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

export function ThemeSelect() {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);

  const options = [
    {
      value: Theme.LIGHT,
      icon: <SunOutlined />,
    },
    {
      value: Theme.DARK,
      icon: <MoonOutlined />,
    },
  ];

  return <Segmented options={options} value={theme} onChange={setTheme} block size="large" />;
}
