import { useSettingsStore } from "@/stores";
import { Flex, Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useMemo } from "react";

const colorOptions = ["#bc4749", "#a53860", "#3a6ea5", "#722ED1"] as const;
const outlineColors = {
  "#bc4749": "outline-[#bc4749]",
  "#a53860": "outline-[#a53860]",
  "#3a6ea5": "outline-[#3a6ea5]",
  "#722ED1": "outline-[#722ED1]",
};

export function PrimaryColor() {
  const colorPrimary = useSettingsStore((state) => state.colorPrimary);
  const changeColorPrimary = useSettingsStore((state) => state.setColorPrimary);

  const colorButtons = useMemo(
    () =>
      colorOptions.map((color) => (
        <ColorButton
          key={color}
          color={color}
          isSelected={colorPrimary === color}
          onClick={() => changeColorPrimary(color)}
        />
      )),
    [colorPrimary, changeColorPrimary],
  );

  return (
    <Flex align="center" gap="small" justify="space-between">
      {colorButtons}

      <label
        htmlFor="primary-color-input"
        className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 !relative"
      >
        <SettingOutlined />
        <Input
          id="primary-color-input"
          type="color"
          value={colorPrimary}
          onChange={(e) => changeColorPrimary(e.currentTarget.value)}
          className="w-0 h-0 !absolute !opacity-0 !cursor-pointer"
        />
      </label>
    </Flex>
  );
}

interface ColorButtonProps {
  onClick: () => void;
  color: (typeof colorOptions)[number];
  isSelected: boolean;
}

function ColorButton({ onClick, color, isSelected }: ColorButtonProps) {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={`w-8 h-8 rounded-full cursor-pointer ${isSelected ? `outline ${outlineColors[color]}` : ""} outline-offset-2`}
    ></div>
  );
}
