import { useSettingsStore } from "@/stores";
import { Language } from "@/models";
import { Flex, Select, Typography } from "antd";
import KSAFlag from "@/assets/icons/KSA.svg";
import USAFlag from "@/assets/icons/USA.svg";

const languageOptions = [
  {
    label: (
      <Flex gap={8} align="center">
        <img src={USAFlag} alt="USA" className="w-5 h-5" />
        <Typography.Text>English</Typography.Text>
      </Flex>
    ),
    value: Language.ENGLISH,
  },
  {
    label: (
      <Flex gap={8} align="center">
        <img src={KSAFlag} alt="KSA" className="w-5 h-5" />
        <Typography.Text>العربية</Typography.Text>
      </Flex>
    ),
    value: Language.ARABIC,
  },
];

export function LanguageSelect() {
  const language = useSettingsStore((state) => state.language);
  const changeLanguage = useSettingsStore((state) => state.setLanguage);

  return (
    <Select
      options={languageOptions}
      value={language}
      onChange={changeLanguage}
      className="w-full min-w-[120px]"
    />
  );
}
