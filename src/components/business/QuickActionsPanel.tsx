import React from "react";
import {
  UserAddOutlined,
  FormOutlined,
  RocketOutlined,
  BlockOutlined,
  SettingOutlined,
  ExportOutlined,
} from "@ant-design/icons";

// 定义单个快捷操作项的接口
interface QuickActionItem {
  label: string;
  icon: React.ReactNode;
  color: string; // Tailwind 颜色类名组合，例如 "bg-blue-50 text-blue-600"
  onClick?: () => void; // 点击事件回调
}

// 定义组件的 Props 接口
interface QuickActionsPanelProps {
  title?: string;
  actions?: QuickActionItem[];
}

// ================= 🚀 默认快捷操作静态定义 =================
const defaultActions: QuickActionItem[] = [
  {
    label: "添加用户",
    icon: <UserAddOutlined />,
    color: "bg-blue-50 text-blue-600",
    onClick: () => console.log("添加用户"),
  },
  {
    label: "创建订单",
    icon: <FormOutlined />,
    color: "bg-green-50 text-green-600",
    onClick: () => console.log("创建订单"),
  },
  {
    label: "发布内容",
    icon: <RocketOutlined />,
    color: "bg-purple-50 text-purple-600",
    onClick: () => console.log("发布内容"),
  },
  {
    label: "添加产品",
    icon: <BlockOutlined />,
    color: "bg-orange-50 text-orange-600",
    onClick: () => console.log("添加产品"),
  },
  {
    label: "系统设置",
    icon: <SettingOutlined />,
    color: "bg-indigo-50 text-indigo-600",
    onClick: () => console.log("系统设置"),
  },
  {
    label: "数据导出",
    icon: <ExportOutlined />,
    color: "bg-gray-50 text-gray-600",
    onClick: () => console.log("数据导出"),
  },
];

export default function QuickActionsPanel({
  title = "快捷操作",
  actions = defaultActions,
}: QuickActionsPanelProps) {
  return (
    /* 💡 变更 1：去掉了死板的 h-95 和 w 限制，改为 w-full h-auto，完全由内容和外层栅格决定宽高 */
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col w-full h-auto select-none">
      <h3 className="font-bold text-gray-800 mb-4 m-0 text-base">{title}</h3>
      {/* /* 💡 变更 2：改成移动端每行 2 个，大屏幕（sm断点以上）每行最多 4 个 (grid-cols-4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            /* 💡 变更 3：微调了内边距 (p-3)，让格子更精简，不占过大空间 */
            className="flex flex-col items-center justify-center border border-gray-50 rounded-2xl p-3 cursor-pointer bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all group"
          >
            {/* 高保真渐变圆角图标层 */}
            {/* 💡 变更 4：图标从 w-12/h-12 稍微缩减到 w-10/h-10，间距 mb-3 改 mb-2，精致且控高 */}
            <div
              className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform duration-200 shrink-0`}
            >
              {item.icon}
            </div>

            <span className="text-xs font-medium text-gray-500 tracking-wide group-hover:text-gray-800 transition-colors">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
