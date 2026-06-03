import React from "react";
import Lottie from "lottie-react";
import workSpaceAnimation from "@/assets/animations/workSpace.json";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onBack?: () => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  return (
    // 🌌 全屏温和浅灰蓝底色
    <div className="min-h-screen w-full bg-[#f4f7fa] flex items-center justify-center p-4 md:p-12 relative overflow-hidden select-none">
      {/* 🔮 四角发光氛围灯 */}
      <div className="absolute top-[-15%] left-[-15%] w-[65vw] h-[65vw] rounded-full bg-blue-200/40 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-indigo-200/40 blur-[120px] pointer-events-none" />

      {/* 🔲 核心卡片：
          1. md:h-[680px] -> 大屏固定高度，小屏 h-auto 靠内容撑开
          2. flex-col md:flex-row -> 小屏上下堆叠，大屏横向并排 
      */}
      <div className="w-full max-w-6xl min-h-125 md:h-170 bg-white/95 backdrop-blur-md rounded-3xl border border-white flex flex-col md:flex-row overflow-hidden shadow-[0_24px_60px_rgba(24,28,50,0.07),0_1px_3px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,0.7)] relative z-10">
        {/* ================= 🌓 左侧：超大 SVG 视觉区 ================= */}
        {/* 📢 响应式修正：小屏下隐藏 (hidden)，大屏展示 (md:flex) 并拿回 60% 宽度 */}
        <div className="hidden md:flex md:w-[60%] h-full bg-linear-to-b from-slate-50/60 to-blue-50/20 p-14 flex-col justify-between items-start border-r border-slate-100 relative overflow-hidden">
          {/* 给庞大的 SVG 撑腰的中心微光 */}
          <div className="absolute w-112.5 h-112.5 bg-blue-500/5 rounded-full blur-[100px] left-[15%] top-[15%] -z-10" />

          {/* 🏷️ 品牌标识 */}
          <div className="flex items-center gap-2 text-slate-700 font-semibold tracking-wide text-sm relative z-10">
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-[10px] text-white">
              ⚙️
            </div>
            <span>INDUSTRIAL CONSOLE</span>
          </div>

          {/* 🔴 插画缩放 */}
          <div className="w-full transform scale-125 lg:scale-130 origin-center my-auto relative z-10 px-4">
            {/* @ts-expect-error - 压制运行时 Vite 的 default 包装错误 */}
            <Lottie.default animationData={workSpaceAnimation} loop={true} className="w-full" />
          </div>

          {/* 📝 底部文字 */}
          <div className="border-l-2 border-blue-500/60 pl-5 w-full relative z-10">
            <h3 className="text-base font-bold text-slate-700 tracking-wider uppercase">
              Workspace Engine
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Efficient automated industrial dispatching terminal.
            </p>
          </div>
        </div>

        {/* ================= 🌓 右侧：表单业务区 ================= */}
        {/* 📢 响应式修正：小屏下宽度 100% (w-full)，大屏下收拢至 40% (md:w-[40%]) 
            加入 py-16 和 px-6 确保小屏下内容有呼吸感
        */}
        <div className="w-full md:w-[40%] h-full bg-white py-16 px-6 md:p-12 lg:p-16 flex flex-col justify-center relative">
          {/* 表单核心包裹圈 */}
          <div className="w-full max-w-sm mx-auto px-4">
            {/* 标题部分 */}
            <div className="mb-9 text-left">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
              <p className="text-slate-400 text-sm mt-2">{subtitle}</p>
            </div>

            {/* 业务表单插槽 */}
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
