import React from "react";
import { Card, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export interface AuthCardProps {
  /** 卡片标题 */
  title: string;
  /** 卡片副标题 */
  subtitle?: string;
  /** 错误信息 */
  error?: string | null;
  /** 子组件 */
  children: React.ReactNode;
  /** 额外的CSS类名 */
  className?: string;
  /** 返回按钮点击事件（提供此属性时会在标题左侧显示返回按钮） */
  onBack?: () => void;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  error,
  children,
  className = "",
  onBack,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card
        className={`shadow-4xs rounded-2xl border-0 bg-white/95 backdrop-blur-sm ${className}`}
        variant="borderless"
      >
        {/* 标题区域 */}
        <div className="mb-8">
          {onBack && (
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              className="shrink-0 text-gray-600 hover:text-gray-800 -ml-2"
              onClick={onBack}
            >
              返回
            </Button>
          )}
          <div className="flex items-center">
            <div className="flex-1 text-center">
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
          </div>
          {subtitle && <p className="text-gray-500 text-center mt-2">{subtitle}</p>}
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* 表单内容 */}
        {children}
      </Card>
    </div>
  );
};

export default AuthCard;
