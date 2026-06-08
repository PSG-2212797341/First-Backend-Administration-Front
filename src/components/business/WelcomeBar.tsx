import { CalendarOutlined, DownOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

// 定义可配置的属性接口
interface WelcomeHeaderProps {
  adminName?: string; // 管理员名称
  subTitle?: string; // 副标题/今日日期提示（如果不传，默认显示代码里的 2024年6月18日）
  defaultRange?: [Dayjs, Dayjs]; // 默认时间范围 [开始时间, 结束时间]
  onDateChange?: (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => void; // 日期改变回调
  onRefresh?: () => void; // 刷新按钮点击回调
}

export default function WelcomeBar({
  adminName = "张管理员",
  subTitle = "今天是 2024年 6月 18日，星期二",
  defaultRange = [dayjs("2024-06-18"), dayjs("2024-06-24")], // 默认给个 7 天范围
  onDateChange,
  onRefresh,
}: WelcomeHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full bg-transparent select-none">
      {/* 左侧欢迎语 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center m-0">
          欢迎回来，{adminName} <span className="ml-2 text-xl">👋</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1 m-0">{subTitle}</p>
      </div>

      {/* 右侧 Antd 操作组件容器 */}
      <div className="flex items-center space-x-2">
        {/* 范围日期选择器 */}
        <RangePicker
          defaultValue={defaultRange}
          allowClear={false}
          // 还原你的视觉设计：右侧自定义小箭头
          suffixIcon={<DownOutlined className="text-gray-400 text-xs" />}
          // 优雅注入左侧前缀日历图标，保证 RangePicker 内部双 input 结构不被破坏
          prefix={<CalendarOutlined className="text-gray-400 mr-1" />}
          // 强行注入原生圆角、边框与微阴影
          className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm text-gray-600 hover:border-blue-500 focus:border-blue-500 shadow-xs cursor-pointer h-9.5 align-middle"
          onChange={onDateChange}
        />

        {/* 刷新按钮 */}
        <Button
          icon={<SyncOutlined className="text-gray-500" />}
          className="bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 shadow-xs h-9.5 w-9.5 p-0 ml-4 shrink-0"
          onClick={onRefresh}
        />
      </div>
    </div>
  );
}
