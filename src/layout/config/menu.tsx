import React from "react";
import { routeConfig, type RouteItem } from "@/router/routeConfig";
import defaultRound from "@/assets/svg/defaultRound.svg";
import activeRound from "@/assets/svg/activeRound.svg";

// ============================================================
// 📐 类型定义
// ============================================================

/**
 * MenuItem - 单个菜单项的数据契约
 *
 * 注意 children 是可选属性：
 * - 如果存在 children（非空数组），Ant Design 会将其渲染为 SubMenu（可展开/折叠的父级分组）
 * - 如果不存在 children，Ant Design 会将其渲染为普通 MenuItem（可点击的叶子节点）
 *
 * 这是之前踩过的坑：之前写死了 children: [] 空数组，
 * 导致所有叶子菜单都被 Ant Design 当成 SubMenu，
 * 点击时只会触发展开/折叠而不会触发 onClick 导航事件。
 */
type MenuItem = {
  key: string; // 菜单唯一标识，也是路由跳转的目标路径，如 "/user/index"
  label: string; // 菜单显示的文本，如 "用户列表"
  icon: React.ReactNode; // 菜单图标，可以是 Ant Design 图标组件或 SVG 图片
  children?: MenuItem[]; // 子菜单项，存在且非空时渲染为 SubMenu
};

// ============================================================
// 🎨 图标工具函数
// ============================================================

/**
 * getRoundIcon - 根据当前路径动态生成圆点图标
 *
 * 用于除首页之外的叶子菜单项（如"用户列表"、"产品列表"等），
 * 这些菜单在路由配置中没有显式设置 icon 属性。
 *
 * 逻辑：
 * - 当前浏览器路径 === 该菜单项的 key → 蓝色实心圆点（激活态）
 * - 否则 → 灰色实心圆点（默认态）
 *
 * @param currentPath - 当前浏览器地址（location.pathname），如 "/user/index"
 * @param itemKey    - 当前菜单项的完整路径 key，如 "/user/index"
 * @returns React 元素：一个 6×6 的 SVG 圆点图标
 *
 * @example
 * // 当前在 /user/index → 该菜单的圆点是蓝色
 * // 当前在 /user/set  → 该菜单的圆点是灰色
 */
const getRoundIcon = (currentPath: string, itemKey: string): React.ReactElement => {
  const isSelected = currentPath === itemKey;
  const svgSrc = isSelected ? activeRound : defaultRound;
  return <img src={svgSrc} alt="round" className="w-1.5 h-1.5 inline-block" />;
};

// ============================================================
// 🏗️ 核心菜单构建函数
// ============================================================

/**
 * createMenus - 递归将路由配置（RouteItem[]）转换为 Ant Design Menu 的 items 配置
 *
 * 这个函数是整个侧边栏菜单的数据源头，它遍历 routeConfig 中的路由树，
 * 将树形路由结构扁平化成 Ant Design Menu 能理解的 MenuItem 数组。
 *
 * 核心转换规则：
 * 1. 过滤：没有 name 或 hidden=true 的路由不生成菜单项（如 /auth/login 不显示在菜单中）
 * 2. 路径拼接：将相对路径拼接为完整的绝对路径（如 "user" + "index" → "/user/index"）
 * 3. 递归：有子路由且子路由中有带 name 的项时才递归生成 children
 * 4. 图标策略：见下方注释中的三级优先级
 *
 * @param routes     - 当前层级的路由配置数组
 * @param parentPath - 父级累积的路径前缀（如 "/user"），用于拼接完整路径
 * @param currentPath - 当前浏览器地址栏路径，传给 getRoundIcon 判断圆点颜色
 * @param isTopLevel  - 当前处理的菜单项是否属于菜单树的第一层（顶级）
 *
 * @returns MenuItem[] - Ant Design Menu 可直接使用的 items 配置
 *
 * @example
 * // 输入 routeConfig[1].children（后台模块的子路由）
 * // 输出 [{ key: "/", label: "首页", icon: <HomeOutlined /> }, ...]
 */
const createMenus = (
  routes: RouteItem[],
  parentPath = "",
  currentPath = "/",
  isTopLevel = false
): MenuItem[] => {
  return (
    routes
      // ── 过滤：只保留有名字且不是隐藏路由的项 ──
      // 例：/auth/login 的 name 是 undefined → 被过滤
      //      /auth 的 hidden=true → 被过滤
      //      首页的 name="首页" 且无 hidden → 保留
      .filter(item => item.name && !item.hidden)

      // ── 逐项映射为 MenuItem ──
      .map(item => {
        // ========== 1. 路径拼接 ==========
        // 目标：生成如 "/user/index" 这样的完整绝对路径
        let fullPath = "";
        if (item.path === "") {
          // 空路径 → 首页，直接使用 "/"
          fullPath = parentPath || "/";
        } else {
          // 拼接父路径和当前路径，用正则去掉重复的斜杠
          // 例：parentPath="/user" + item.path="index" → "/user/index"
          fullPath = `${parentPath}/${item.path}`.replace(/\/+/g, "/");
        }

        // 清理末尾多余的斜杠（保留单独的 "/"）
        if (fullPath.length > 1 && fullPath.endsWith("/")) {
          fullPath = fullPath.slice(0, -1);
        }

        // ========== 2. 递归生成子菜单 ==========
        // 只有当存在子路由，且子路由中至少有一个带有 name 属性时，才去递归生成 children
        // 例：用户管理（path="user"）有 children 且子项有 name → 生成 children
        //     首页（path=""）有 element 但没有可显示的子菜单 → subItems=undefined
        const subItems =
          item.children && item.children.some(child => child.name)
            ? createMenus(item.children, fullPath, currentPath, false)
            : undefined;

        // ========== 3. 图标策略（三级优先级） ==========
        //
        // 优先级从高到低：
        //   ① 路由配置显式指定了 icon 属性 → 直接使用
        //      例：首页的 <HomeOutlined />、用户管理的 <FolderOutlined />
        //   ② 非顶级的叶子节点且未指定 icon → 使用圆点 SVG 作为默认图标
        //      例：用户列表、产品分类等子菜单项
        //   ③ 顶级叶子节点无 icon → 保持原样（undefined）
        //      当前无此场景，纯作为兜底分支
        //
        // 🐛 之前踩坑：children: [] 导致所有叶子节点被当成 SubMenu 而非 MenuItem，
        //    圆点图标不生效 + 点击无反应。修复方案：children 只在有子项时才设置。
        const icon = subItems
          ? item.icon // 情况①：父级分组菜单，使用路由配置的图标
          : item.icon // 情况②：叶子节点有显式图标（如首页的 HomeOutlined）
            ? item.icon
            : isTopLevel
              ? item.icon // 情况③：顶级叶子节点无图标（兜底）
              : getRoundIcon(currentPath, fullPath); // 情况②-子：次叶子节点无图标 → 圆点SVG

        // ========== 4. 组装 MenuItem ==========
        return {
          key: fullPath,
          label: item.name!,
          icon,
          // 只在有子菜单时才展开 children，否则不设置该属性
          // 这样 Ant Design 才能正确区分 SubMenu（有 children）和 MenuItem（无 children）
          ...(subItems ? { children: subItems } : {}),
        } as MenuItem;
      })
  );
};

// ============================================================
// 📤 对外导出
// ============================================================

/**
 * getMenuItems - 侧边栏菜单的唯一入口函数
 *
 * 供 Sider 组件调用，传入当前浏览器路径，返回完整的菜单配置数组。
 *
 * 为什么只取 routeConfig[1]?.children？
 *   routeConfig[0] = /auth 模块（登录/注册/忘记密码），hidden=true，不参与菜单
 *   routeConfig[1] = / 根路径（后台模块），其 children 才是真正的菜单数据
 *
 * @param currentPath - 当前浏览器地址路径，用于圆点图标的选中状态判断
 * @returns MenuItem[] - Ant Design Menu 的 items 配置数组
 *
 * @example
 * // Sider.tsx 中：
 * const menuItems = getMenuItems(location.pathname);
 * <Menu items={menuItems} ... />
 */
export const getMenuItems = (currentPath = "/"): MenuItem[] => {
  // 取后台模块（routeConfig[1]）的 children 作为菜单数据源
  const backStageChildren = routeConfig[1]?.children || [];
  // 传入 "/" 作为根路径的 base，currentPath 用于图标状态，isTopLevel=true 表示这是第一层
  return createMenus(backStageChildren, "/", currentPath, true);
};
