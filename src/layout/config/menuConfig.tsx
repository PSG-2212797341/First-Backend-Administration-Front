import React from "react";
import {
  AppstoreOutlined,
  FolderOutlined,
  MenuOutlined,
  ReadOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import defaultRound from "@/assets/svg/defaultRound.svg";
import activeRound from "@/assets/svg/activeRound.svg";

// 💡 依然保持你高分的根据状态动态换图标逻辑
export const getIcon = (selectedKey: string, currentKey: string): React.ReactElement => {
  const isSelected = selectedKey === currentKey;
  const svgSrc = isSelected ? activeRound : defaultRound;
  return <img src={svgSrc} alt="round" className="w-1.5 h-1.5 inline-block" />;
};

/**
 * 🎯 大厂金牌菜单表：将 key 直接和 react-router 的 path 绑定
 */
export const generateMenuItems = (currentPath: string) => [
  {
    key: "/", // <-- 路由路径直接当 key
    icon: <AppstoreOutlined />,
    label: "首页",
    children: [
      {
        key: "/",
        label: "数据分析",
        icon: getIcon(currentPath, "/"),
      },
    ],
  },
  {
    key: "/form",
    icon: <FolderOutlined />,
    label: "表单状态",
    children: [
      {
        key: "/form/basic",
        label: "基础表单",
        icon: getIcon(currentPath, "/form/basic"),
      },
    ],
  },
  {
    key: "/list",
    icon: <MenuOutlined />,
    label: "列表状态",
    children: [
      {
        key: "/list/standard",
        label: "查询表格",
        icon: getIcon(currentPath, "/list/standard"),
      },
    ],
  },
  {
    key: "/detail",
    icon: <ReadOutlined />,
    label: "详情列表",
    children: [
      {
        key: "/detail/basic",
        label: "基础详情页",
        icon: getIcon(currentPath, "/detail/basic"),
      },
    ],
  },
  {
    key: "/report",
    icon: <BarChartOutlined />,
    label: "数据报表",
    children: [
      {
        key: "/report/data",
        label: "数据统计",
        icon: getIcon(currentPath, "/report/data"),
      },
    ],
  },
];
