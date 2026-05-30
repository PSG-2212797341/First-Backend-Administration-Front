import { message } from "antd";
import type { PageConfig } from "@/components/configurable/configurable.type";

// 模拟 API 接口（实际项目中替换为真实 API）
const mockApi = {
  list: async (params: Record<string, unknown>) => {
    console.log("查询参数:", params);
    // 模拟返回数据
    return {
      data: [
        {
          id: 1,
          username: "admin",
          email: "admin@example.com",
          phone: "13800138000",
          status: "active",
          role: "管理员",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          username: "zhangsan",
          email: "zhangsan@example.com",
          phone: "13900139000",
          status: "active",
          role: "编辑者",
          createdAt: "2024-03-20",
        },
        {
          id: 3,
          username: "lisi",
          email: "lisi@example.com",
          phone: "13700137000",
          status: "inactive",
          role: "访客",
          createdAt: "2024-05-10",
        },
        {
          id: 4,
          username: "wangwu",
          email: "wangwu@example.com",
          phone: "13600136000",
          status: "active",
          role: "编辑者",
          createdAt: "2024-07-08",
        },
        {
          id: 5,
          username: "zhaoliu",
          email: "zhaoliu@example.com",
          phone: "13500135000",
          status: "inactive",
          role: "访客",
          createdAt: "2024-09-12",
        },
      ],
      total: 5,
    };
  },
  create: async (data: Record<string, unknown>) => {
    console.log("创建用户:", data);
    message.success("用户创建成功");
  },
  update: async (data: Record<string, unknown>) => {
    console.log("更新用户:", data);
    message.success("用户更新成功");
  },
  delete: async (id: string) => {
    console.log("删除用户:", id);
    message.success("用户删除成功");
  },
};
