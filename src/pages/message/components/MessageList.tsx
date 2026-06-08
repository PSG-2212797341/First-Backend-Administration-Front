// 📂 src/pages/message/components/MessageList.tsx
import React from "react";
import { Tabs, Select, Button, Pagination } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { type MessageItem } from "../constants";

// ==========================================
// 1. 声明独立的 Tab 标签标题子组件（移至外部，避免 Render 期间重建）
// ==========================================
interface TabTitleProps {
  text: string;
  count: number;
}

const TabTitle: React.FC<TabTitleProps> = ({ text, count }) => (
  <span className="px-1 text-xs">
    {text}{" "}
    {count > 0 && (
      <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-blue-50 text-blue-600 rounded-full font-sans font-medium">
        {count}
      </span>
    )}
  </span>
);

// ==========================================
// 2. 主列表组件的 Props 类型接口声明
// ==========================================
interface MessageListProps {
  messages: MessageItem[];
  filteredList: MessageItem[];
  activeMessageId: string;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onSelectMessage: (id: string) => void;
  onMarkAllRead: () => void;
}

// ==========================================
// 3. 消息列表主组件
// ==========================================
export const MessageList: React.FC<MessageListProps> = ({
  messages,
  filteredList,
  activeMessageId,
  currentTab,
  onTabChange,
  onSelectMessage,
  onMarkAllRead,
}) => {
  return (
    <div className="xl:col-span-5 rounded-xl shadow-md bg-white flex flex-col justify-between overflow-hidden">
      <div>
        {/* Tab 栏切换区 */}
        <div className="px-4 pt-2 border-b border-gray-100">
          <Tabs
            activeKey={currentTab}
            onChange={onTabChange}
            className="message-tabs"
            items={[
              {
                key: "all",
                label: <TabTitle text="全部消息" count={messages.length} />,
              },
              {
                key: "unread",
                label: (
                  <TabTitle
                    text="未读消息"
                    count={messages.filter(m => m.status === "unread").length}
                  />
                ),
              },
              {
                key: "mine",
                label: <TabTitle text="@我的" count={3} />,
              },
            ]}
          />
        </div>

        {/* 顶部工具筛选栏 */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-2">
            <Select
              defaultValue="all-type"
              size="small"
              className="w-24 text-xs"
              options={[{ value: "all-type", label: "全部类型" }]}
            />
            <Select
              defaultValue="all-status"
              size="small"
              className="w-24 text-xs"
              options={[{ value: "all-status", label: "全部状态" }]}
            />
          </div>
          <Button
            type="text"
            size="small"
            icon={<CheckOutlined className="text-xs" />}
            className="text-xs text-gray-500 hover:text-blue-500 flex items-center"
            onClick={onMarkAllRead}
          >
            标记已读
          </Button>
        </div>

        {/* 消息动态滚动列表 */}
        <div className="divide-y divide-gray-100 max-h-145 overflow-y-auto">
          {filteredList.map(msg => (
            <div
              key={msg.id}
              onClick={() => onSelectMessage(msg.id)}
              className={`p-4 flex items-start gap-3 cursor-pointer transition-all duration-150 relative ${
                activeMessageId === msg.id ? "bg-blue-50/40" : "hover:bg-gray-50/60"
              }`}
            >
              {/* 当前激活项的左侧蓝色高亮条 */}
              {activeMessageId === msg.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
              )}

              {/* 消息分类图标围栏 */}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${msg.iconBg} text-base`}
              >
                {msg.icon}
              </div>

              {/* 标题与描述 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-bold truncate ${msg.status === "unread" ? "text-gray-900" : "text-gray-600"}`}
                  >
                    {msg.title}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono shrink-0 ml-2">
                    {msg.time}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate pr-4">
                  {msg.content.intro || msg.title}
                </p>
              </div>

              {/* 未读状态小蓝点 */}
              {msg.status === "unread" && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
              )}
            </div>
          ))}

          {/* 空状态处理 */}
          {filteredList.length === 0 && (
            <div className="text-center py-12 text-xs text-gray-400">暂无相关消息</div>
          )}
        </div>
      </div>

      {/* 底部固定的分页控制区 */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2 bg-white">
        <span className="text-xs text-gray-400">共 {filteredList.length} 条</span>
        <Pagination
          size="small"
          total={filteredList.length}
          pageSize={10}
          current={1}
          showSizeChanger={false}
        />
        <Select
          defaultValue="10"
          size="small"
          className="w-20 text-xs"
          options={[{ value: "10", label: "10条/页" }]}
        />
      </div>
    </div>
  );
};
