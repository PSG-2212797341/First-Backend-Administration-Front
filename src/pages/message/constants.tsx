// 📂 constants.tsx
import React from "react";
import {
  BellOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

// 1. 规范消息内容的 TypeScript 接口
export interface MessageDetailItem {
  label: string;
  value: string | string[];
}

export interface MessageContent {
  salutation: string;
  intro: string;
  details?: MessageDetailItem[];
  footer: string;
  team: string;
}

export interface MessageItem {
  id: string;
  title: string;
  type: string;
  tagColor: string;
  status: "unread" | "read";
  time: string;
  date: string;
  icon: React.ReactNode;
  iconBg: string;
  content: MessageContent;
}

// 2. 迁移初始静态数据
export const initialMessages: MessageItem[] = [
  {
    id: "1",
    title: "系统更新通知",
    type: "系统通知",
    tagColor: "blue",
    status: "unread",
    time: "10:30",
    date: "2024-05-20 10:30:00",
    icon: <BellOutlined />,
    iconBg: "bg-blue-50 text-blue-500",
    content: {
      salutation: "尊敬的系统管理员，您好！",
      intro: "系统将于以下时间进行版本更新，更新期间系统将暂停服务，请提前做好相关准备。",
      details: [
        { label: "更新时间", value: "2024-05-25 02:00:00 ~ 04:00:00（预计 2 小时）" },
        { label: "更新版本", value: "WorkPro v2.6.0" },
        {
          label: "更新内容",
          value: ["1. 新增多维度数据分析功能", "2. 优化系统性能和稳定性", "3. 修复已知问题"],
        },
        { label: "影响范围", value: "全体用户" },
        {
          label: "注意事项",
          value: [
            "1. 更新期间系统将无法访问",
            "2. 请提前保存正在处理的数据",
            "3. 如有问题请联系客服",
          ],
        },
      ],
      footer: "感谢您的理解与支持！",
      team: "WorkPro 运维团队",
    },
  },
  {
    id: "2",
    title: "订单状态更新",
    type: "业务通知",
    tagColor: "green",
    status: "unread",
    time: "09:15",
    date: "2024-05-20 09:15:00",
    icon: <CheckCircleOutlined />,
    iconBg: "bg-emerald-50 text-emerald-500",
    content: {
      salutation: "您好！",
      intro: "您关注的订单状态已有更新：",
      details: [
        { label: "订单编号", value: "#ORD-202405200001" },
        { label: "当前状态", value: "已完成审核" },
      ],
      footer: "请前往订单管理模块查看详情。",
      team: "WorkPro 订单中心",
    },
  },
  {
    id: "3",
    title: "审批待处理提醒",
    type: "待办提醒",
    tagColor: "orange",
    status: "unread",
    time: "09:00",
    date: "2024-05-20 09:00:00",
    icon: <ExclamationCircleOutlined />,
    iconBg: "bg-amber-50 text-amber-500",
    content: {
      salutation: "主管您好！",
      intro: "您有 3 条审批单据单据待处理，请及时处理以免影响业务流程。",
      details: [
        { label: "待办类型", value: "报销审批 / 合同审核" },
        { label: "紧急程度", value: "中" },
      ],
      footer: "点击下方按钮可直接跳转到审批中心。",
      team: "WorkPro 工作流中心",
    },
  },
  {
    id: "4",
    title: "数据同步完成",
    type: "系统通知",
    tagColor: "blue",
    status: "unread",
    time: "昨天 18:30",
    date: "2024-05-19 18:30:00",
    icon: <SyncOutlined />,
    iconBg: "bg-purple-50 text-purple-500",
    content: {
      salutation: "管理员您好！",
      intro: "日常数据同步任务已完成。",
      details: [
        { label: "任务名称", value: "每日基础数据同步" },
        { label: "同步结果", value: "成功同步 1,256 条数据" },
      ],
      footer: "",
      team: "WorkPro 数据中心",
    },
  },
  {
    id: "5",
    title: "新用户注册",
    type: "系统通知",
    tagColor: "blue",
    status: "read",
    time: "昨天 16:20",
    date: "2024-05-19 16:20:00",
    icon: <UserOutlined />,
    iconBg: "bg-blue-50 text-blue-500",
    content: {
      salutation: "您好！",
      intro: "系统有新用户注册，等待您的审核。",
      details: [
        { label: "用户名", value: "李四" },
        { label: "注册时间", value: "2024-05-19 16:20:00" },
      ],
      footer: "",
      team: "WorkPro 用户中心",
    },
  },
  {
    id: "6",
    title: "系统告警",
    type: "系统告警",
    tagColor: "red",
    status: "read",
    time: "昨天 14:10",
    date: "2024-05-19 14:10:00",
    icon: <InfoCircleOutlined />,
    iconBg: "bg-rose-50 text-rose-500",
    content: {
      salutation: "紧急通知：",
      intro: "服务器触发指标告警，请及时清理或扩容。",
      details: [
        { label: "告警节点", value: "存储空间节点 A" },
        { label: "当前指标", value: "使用率已达 85%" },
      ],
      footer: "请运维人员立即介入排查。",
      team: "WorkPro 监控中心",
    },
  },
];
