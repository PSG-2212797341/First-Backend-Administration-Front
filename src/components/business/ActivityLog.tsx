import React from "react";

interface ActivityFeedProps {
  title: string;
  onMoreClick?: () => void;
  children: React.ReactNode; // 这里直接接收渲染内容，不再通过数据数组限制
}

const ActivityFeedContainer: React.FC<ActivityFeedProps> = ({ title, onMoreClick, children }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs w-full h-auto">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-gray-800 m-0 text-base">{title}</h3>
      {onMoreClick && (
        <span
          onClick={onMoreClick}
          className="text-xs text-blue-600 cursor-pointer hover:underline"
        >
          查看更多 &gt;
        </span>
      )}
    </div>
    {/* 这里使用 CSS Grid 或 flex 布局作为时间轴或列表的基础容器 */}
    <div className="flex flex-col gap-5">{children}</div>
  </div>
);

// 这是一个通用的“行”组件，只负责绘制左侧圆点轴，内容由你随意填入
const FeedRow: React.FC<{
  dotColor?: string;
  children: React.ReactNode;
  isLast?: boolean;
}> = ({ dotColor = "#cbd5e1", children, isLast = false }) => (
  <div className="flex gap-4">
    {/* 时间轴左侧线与圆点 */}
    <div className="relative flex flex-col items-center shrink-0">
      <div
        className="w-2.5 h-2.5 rounded-full border-2 bg-white z-10"
        style={{ borderColor: dotColor }}
      />
      {!isLast && <div className="absolute top-3 w-0.5 h-full bg-gray-100" />}
    </div>
    {/* 内容区域 */}
    <div className="flex-1 pb-1">{children}</div>
  </div>
);

export { ActivityFeedContainer, FeedRow };
