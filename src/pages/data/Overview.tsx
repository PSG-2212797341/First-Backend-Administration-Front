import dayjs from "dayjs";
import { WelcomeBar } from "@/components/business";
import DataCard from "./components/KpiCard";
import ChartsCard from "./components/ChartsCard";
import ConditionCard from "./components/ConditionCard";

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* 顶部面包屑与筛选器区域 */}
      <WelcomeBar
        adminName="数据概览"
        subTitle="实时掌握系统整体运行状态与关键业务数据"
        defaultRange={[dayjs("2024-06-01"), dayjs("2024-06-18")]} // 动态指定默认范围
      />

      {/* KPI 核心指标卡片 */}
      <DataCard />

      {/* 业务趋势图 + 业务分布图 + 用户来源排行 */}
      <ChartsCard />

      {/* 状态与动态、区域分布、资源使用组合底行 */}
      <ConditionCard />

      {/* 页脚 */}
      <footer className="text-center text-[11px] text-gray-400 mt-8 font-mono">
        © 2024 WorkPro. All rights reserved.
      </footer>
    </div>
  );
}
