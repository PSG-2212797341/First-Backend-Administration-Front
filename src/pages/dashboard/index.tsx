import { WelcomeBar } from "@/components/business";
import ActiveCard from "./components/ActiveCard";
import ConvientAction from "./components/ConvientAction";
import ImportantPipe from "./components/ImportantPipe";
import RecentEvent from "./components/RecentEvent";
import dayjs from "dayjs";

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <WelcomeBar
        adminName="张管理员"
        subTitle="今天是 2024年 6月 18日，星期二"
        defaultRange={[dayjs("2024-06-01"), dayjs("2024-06-18")]} // 动态指定默认范围
      />

      {/* 4个Kpi卡片 */}
      <ActiveCard />

      {/* 数据趋势与快捷操作 */}
      <ConvientAction />

      {/* 业务分布 / 订单状态 / 待办事项 */}
      <ImportantPipe />

      {/* 最近活动 */}
      <RecentEvent />
    </div>
  );
}
