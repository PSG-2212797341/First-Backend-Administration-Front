import { useState } from "react";
import { WelcomeBar } from "@/components/business";
import dayjs from "dayjs";
import { initialMessages, type MessageItem } from "./constants";
import { MessageList } from "./components/MessageList";
import { MessageDetail } from "./components/MessageDetail";

export default function Center() {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [activeMessageId, setActiveMessageId] = useState<string>("1");
  const [currentTab, setCurrentTab] = useState<string>("all");

  const activeMessage = messages.find(m => m.id === activeMessageId);

  const getFilteredMessages = () => {
    if (currentTab === "unread") return messages.filter(m => m.status === "unread");
    if (currentTab === "mine") return messages.filter(m => m.id === "3");
    return messages;
  };

  const handleSelectMessage = (id: string) => {
    setActiveMessageId(id);
    setMessages(prev => prev.map(m => (m.id === id ? { ...m, status: "read" as const } : m)));
  };

  const handleMarkAllRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, status: "read" as const })));
  };

  return (
    <div className="space-y-6">
      <WelcomeBar
        adminName="消息中心"
        subTitle="查看和管理系统消息，及时获取重要通知和提醒"
        defaultRange={[dayjs("2024-06-01"), dayjs("2024-06-18")]}
      />

      {/* 外层双栏 Grid 控制骨架 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* 左侧消息列表 */}
        <MessageList
          messages={messages}
          filteredList={getFilteredMessages()}
          activeMessageId={activeMessageId}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onSelectMessage={handleSelectMessage}
          onMarkAllRead={handleMarkAllRead}
        />

        {/* 右侧消息详情 */}
        <MessageDetail activeMessage={activeMessage} />
      </div>

      <footer className="text-center text-[11px] text-gray-400 mt-8 font-mono">
        © 2026 WorkPro. All rights reserved.
      </footer>
    </div>
  );
}
