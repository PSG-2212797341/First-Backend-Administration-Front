// 📂 components/MessageDetail.tsx
import React from "react";
import { Button, Tag } from "antd";
import { MoreOutlined, FileTextOutlined } from "@ant-design/icons";
import { type MessageItem } from "../constants";

interface MessageDetailProps {
  activeMessage: MessageItem | undefined;
}

export const MessageDetail: React.FC<MessageDetailProps> = ({ activeMessage }) => {
  if (!activeMessage) {
    return (
      <div className="xl:col-span-7 rounded-xl shadow-md bg-white p-5 min-h-160 flex flex-col items-center justify-center text-gray-400 py-24 text-xs">
        <FileTextOutlined className="text-3xl text-gray-200 mb-2" />
        请在左侧选择一条消息进行预览
      </div>
    );
  }

  return (
    <div className="xl:col-span-7 rounded-xl shadow-md bg-white p-5 min-h-160 flex flex-col justify-between">
      <div className="h-full flex flex-col justify-between flex-1">
        <div>
          {/* 详情头部 */}
          <div className="flex items-start justify-between border-b border-gray-100 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeMessage.iconBg} text-lg`}
              >
                {activeMessage.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-gray-800">{activeMessage.title}</h2>
                  <Tag
                    color={activeMessage.tagColor}
                    className="border-0 text-[10px] px-1.5 font-medium scale-95 origin-left"
                  >
                    {activeMessage.type}
                  </Tag>
                </div>
                <div className="text-xs text-gray-400 font-mono mt-0.5">{activeMessage.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeMessage.status === "unread" && (
                <Tag color="blue" className="m-0 border-0 text-[10px]">
                  未读
                </Tag>
              )}
              <Button type="text" icon={<MoreOutlined />} className="text-gray-400" />
            </div>
          </div>

          {/* 正文区域 */}
          <div className="text-xs text-gray-600 leading-relaxed space-y-4">
            <p className="font-medium text-gray-700">{activeMessage.content.salutation}</p>
            <p className="text-gray-600">{activeMessage.content.intro}</p>

            {/* 结构化列表区 */}
            {activeMessage.content.details && (
              <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 space-y-3 font-sans">
                {activeMessage.content.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="w-20 text-gray-400 font-medium shrink-0">{detail.label}</span>
                    <div className="flex-1 text-gray-700">
                      {Array.isArray(detail.value) ? (
                        <div className="space-y-1">
                          {detail.value.map((line, lIdx) => (
                            <div key={lIdx}>{line}</div>
                          ))}
                        </div>
                      ) : (
                        <span>{detail.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-gray-600 pt-1">{activeMessage.content.footer}</p>

            {/* 署名 */}
            <div className="pt-2 text-gray-400 font-medium">
              <div>{activeMessage.content.team}</div>
              <div className="font-mono text-[10px] mt-0.5">{activeMessage.date.split(" ")[0]}</div>
            </div>
          </div>
        </div>

        {/* 操作底栏 */}
        <div className="border-t border-gray-100 pt-5 mt-6 flex items-center gap-3">
          <div className="text-xs font-bold text-gray-800 mr-2">相关操作</div>
          <Button size="middle" className="text-xs rounded-lg border-gray-200 text-gray-600">
            查看更新日志
          </Button>
          <Button
            type="primary"
            size="middle"
            className="text-xs rounded-lg bg-blue-500 border-none shadow-sm"
          >
            系统状态页面
          </Button>
        </div>
      </div>
    </div>
  );
};
