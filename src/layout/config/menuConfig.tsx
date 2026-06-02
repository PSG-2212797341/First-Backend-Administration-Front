import React from "react";
import defaultRound from "@/assets/svg/defaultRound.svg";
import activeRound from "@/assets/svg/activeRound.svg";
import { AppstoreOutlined, FolderOutlined } from "@ant-design/icons";

// 💡 依然保持你高分的根据状态动态换图标逻辑
export const getIcon = (selectedKey: string, currentKey: string): React.ReactElement => {
  const isSelected = selectedKey === currentKey;
  const svgSrc = isSelected ? activeRound : defaultRound;
  return <img src={svgSrc} alt="round" className="w-1.5 h-1.5 inline-block" />;
};

export const generateMenuItems = (currentPath: string) => [
  {
    key: "/",
    icon: <AppstoreOutlined />,
    label: "首页",
    children: [
      {
        key: "/index", // 🎯 改为唯一 key
        label: "数据分析",
        icon: getIcon(currentPath, "/index"),
      },
    ],
  },

  {
    key: "/user",
    icon: <FolderOutlined />,
    label: "表单状态",
    children: [
      {
        key: "/user/index",
        label: "基础信息",
        icon: getIcon(currentPath, "/user/index"),
      },
    ],
  },
];
