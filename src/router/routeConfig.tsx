import {
  HomeOutlined,
  FolderOutlined,
  ProductOutlined,
  OrderedListOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  MessageOutlined,
  UserSwitchOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { lazyLoad } from "@/components/lazy-load";
import MyLayout from "@/layout/Index";

// 🔹 定义 RouteItem 类型
export interface RouteItem {
  index?: boolean; // 是否是首页
  path: string; // 路由路径
  name?: string; // 菜单显示名称
  icon?: React.ReactNode; // 菜单图标
  element?: React.ReactNode; // 对应页面组件
  auth?: boolean; // 是否需要登录
  hidden?: boolean; // 是否隐藏菜单
  children?: RouteItem[]; // 嵌套路由
}

// 🔹 路由配置数组
export const routeConfig: RouteItem[] = [
  //-----------------------------------
  // 登录模块（外部通道）
  //-----------------------------------
  {
    path: "/auth",
    auth: false, // 不需要登录
    hidden: true, // 不显示菜单
    children: [
      {
        path: "login",
        element: lazyLoad(() => import("@/pages/auth/login")),
      },
      {
        path: "register",
        element: lazyLoad(() => import("@/pages/auth/Register")),
      },
      {
        path: "forgot-password",
        element: lazyLoad(() => import("@/pages/auth/ForgotPassword")),
      },
    ],
  },

  //-----------------------------------
  // 后台模块（内部通道）
  //-----------------------------------
  {
    path: "/", // 根路径
    auth: true, // 需要登录
    element: <MyLayout />, // 布局组件
    children: [
      // 首页
      {
        index: true,
        path: "",
        name: "首页",
        icon: <HomeOutlined />,
        element: lazyLoad(() => import("@/pages/dashboard/index")),
      },

      // 数据概览
      {
        path: "Overview",
        name: "数据概览",
        icon: <DatabaseOutlined />,
        element: lazyLoad(() => import("@/pages/data/Overview")),
      },

      // 用户管理
      {
        path: "user",
        name: "用户管理",
        icon: <FolderOutlined />,
        children: [
          {
            path: "index",
            name: "用户列表",
            element: lazyLoad(() => import("@/pages/user/UserManage")),
          },
          {
            path: "set",
            name: "用户组",
            element: lazyLoad(() => import("@/pages/user/UserSet")),
          },
        ],
      },

      // 产品管理
      {
        path: "product",
        name: "产品管理",
        icon: <ProductOutlined />,
        children: [
          {
            path: "index",
            name: "产品列表",
            element: lazyLoad(() => import("@/pages/product/ProductList")),
          },
          {
            path: "sort",
            name: "产品分类",
            element: lazyLoad(() => import("@/pages/product/ProductSort")),
          },
          {
            path: "brand",
            name: "产品品牌",
            element: lazyLoad(() => import("@/pages/product/ProductBrand")),
          },
          {
            path: "standard",
            name: "产品规格",
            element: lazyLoad(() => import("@/pages/product/ProductStandard")),
          },
          {
            path: "evaluate",
            name: "产品评价",
            element: lazyLoad(() => import("@/pages/product/ProductEvaluate")),
          },
          {
            path: "stock",
            name: "产品库存",
            element: lazyLoad(() => import("@/pages/product/ProductStock")),
          },
        ],
      },

      // 订单管理
      {
        path: "order",
        name: "订单管理",
        icon: <OrderedListOutlined />,
        children: [
          {
            path: "index",
            name: "订单列表",
            element: lazyLoad(() => import("@/pages/order/OrderList")),
          },
          {
            path: "after-sales",
            name: "售后管理",
            element: lazyLoad(() => import("@/pages/order/OrderAfterSales")),
          },
          {
            path: "bill",
            name: "发票管理",
            element: lazyLoad(() => import("@/pages/order/OrderBill")),
          },
          {
            path: "exchanges",
            name: "退换货管理",
            element: lazyLoad(() => import("@/pages/order/OrderExchanges")),
          },
        ],
      },

      // 内容管理
      {
        path: "content",
        name: "内容管理",
        icon: <ContainerOutlined />,
        children: [
          {
            path: "index",
            name: "内容列表",
            element: lazyLoad(() => import("@/pages/content/ContentList")),
          },
          {
            path: "category",
            name: "栏目管理",
            element: lazyLoad(() => import("@/pages/content/ContentCategory")),
          },
          {
            path: "tag",
            name: "标签管理",
            element: lazyLoad(() => import("@/pages/content/ContentTag")),
          },
          {
            path: "comment",
            name: "评论管理",
            element: lazyLoad(() => import("@/pages/content/ContentComment")),
          },
          {
            path: "recycle",
            name: "回收站",
            element: lazyLoad(() => import("@/pages/content/ContentRecycle")),
          },
        ],
      },

      // 消息中心
      {
        path: "message",
        name: "消息中心",
        icon: <MessageOutlined />,
        element: lazyLoad(() => import("@/pages/message/Center")),
      },

      // 权限管理
      {
        path: "permissions",
        name: "权限管理",
        icon: <UserSwitchOutlined />,
        element: lazyLoad(() => import("@/pages/permissions/Center")),
      },

      // 系统设置
      {
        path: "setting",
        name: "系统设置",
        icon: <SettingOutlined />,
        children: [
          {
            path: "index",
            name: "基础设置",
            element: lazyLoad(() => import("@/pages/setting/BaseConfig")),
          },
          {
            path: "security",
            name: "安全设置",
            element: lazyLoad(() => import("@/pages/setting/SecurityConfig")),
          },
          {
            path: "notification",
            name: "通用设置",
            element: lazyLoad(() => import("@/pages/setting/NotificationConfig")),
          },
          {
            path: "business",
            name: "业务设置",
            element: lazyLoad(() => import("@/pages/setting/BusinessConfig")),
          },
          {
            path: "storage",
            name: "存储设置",
            element: lazyLoad(() => import("@/pages/setting/StorageConfig")),
          },
          {
            path: "integration",
            name: "集成设置",
            element: lazyLoad(() => import("@/pages/setting/IntegrationConfig")),
          },
          {
            path: "log",
            name: "日志设置",
            element: lazyLoad(() => import("@/pages/setting/LogConfig")),
          },
          {
            path: "maintenance",
            name: "维护设置",
            element: lazyLoad(() => import("@/pages/setting/MaintenanceConfig")),
          },
        ],
      },
    ],
  },
];
