import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { getOpenKeysByPath } from "./utils/navigationLogic";
import { getMenuItems } from "./config/menu";

// ============================================================
// 📐 Props 类型
// ============================================================
interface MySiderProps {
  collapsed?: boolean; // 侧边栏是否折叠（桌面端按钮控制）
  isMobile?: boolean; // 是否为移动端视口
  onMobileClose?: () => void; // 移动端点击菜单后关闭遮罩
}

// ============================================================
// 🧭 MySider - 侧边栏菜单组件
// ============================================================
//
// 职责：
// 1. 将路由配置转换为 Ant Design Menu 可用的 items
// 2. 管理菜单展开/折叠状态（openKeys）——手风琴模式
// 3. 管理菜单选中状态（selectedKeys）——父子级联动高亮
// 4. 处理菜单点击导航逻辑
//
// 🔑 关键设计决策：
// - 父级菜单（如"用户管理"）点击时：展开该组 + 自动跳转第一个子项
// - 子菜单项（如"用户列表"）点击时：保持父级展开不收起
// - 顶级叶子节点（如"首页"）点击时：收起所有展开的菜单
// - 手风琴模式：同一时间只有一个父级菜单组展开
//
// 🐛 已修复的历史问题：
// 1. 子路由 element 被 ProtectedRoute 错误包裹（renderRoutes.tsx）
// 2. children: [] 导致 Ant Design 把叶子项当成 SubMenu（menu.tsx）
// 3. onOpenChange 和 handleMenuClick 同时 navigate 产生竞态
// 4. 点击子菜单时父级意外收起
// ============================================================

function MySider({ collapsed = false, isMobile = false, onMobileClose }: MySiderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // ── 生成菜单数据，传入当前路径用于圆点图标选中状态 ──
  const menuItems = getMenuItems(location.pathname);

  // ============================================================
  // 🎯 selectedKeys - 菜单选中状态（父子联动）
  // ============================================================
  //
  // 普通的 Ant Design Menu 只用 [location.pathname] 作为 selectedKeys，
  // 这样只有叶子节点会高亮，父级分组菜单不会高亮。
  //
  // 这里通过递归向上查找父级 key，将当前路径及其所有祖先路径
  // 都加入 selectedKeys，实现"选中子菜单时父级也高亮"的效果。
  //
  // 例：当前在 /user/index：
  //   selectedKeys = ["/user", "/user/index"]
  //   → "用户管理" 和 "用户列表" 都会高亮
  const selectedKeys = (() => {
    const keys: string[] = [];

    /**
     * 递归在菜单树中查找目标路径，沿途收集所有祖先的 key
     *
     * @param items   - 当前层级的菜单项数组
     * @param target  - 要查找的目标路径，如 "/user/index"
     * @param parents - 已累积的祖先 key 列表
     * @returns 是否找到目标
     */
    const findParentKeys = (
      items: typeof menuItems,
      target: string,
      parents: string[]
    ): boolean => {
      for (const item of items) {
        // 找到目标节点：把沿途所有祖先 + 目标自身都加入 keys
        if (item.key === target) {
          keys.push(...parents, target);
          return true;
        }
        // 还没找到，继续在子菜单中递归查找
        if (item.children && findParentKeys(item.children, target, [...parents, item.key])) {
          return true;
        }
      }
      return false;
    };

    // 从顶级菜单开始搜索
    findParentKeys(menuItems, location.pathname, []);
    return keys;
  })();

  // ============================================================
  // 📂 openKeys - 菜单展开状态
  // ============================================================
  //
  // 初始值：根据当前路径反推应该展开哪个父级菜单
  // collapsed 状态下强制收起所有菜单（侧边栏只有图标时展开无意义）
  const [openKeys, setOpenKeys] = useState<string[]>(
    collapsed ? [] : getOpenKeysByPath(location.pathname)
  );

  // ============================================================
  // 🖱️ handleMenuClick - 菜单项点击处理
  // ============================================================
  //
  // 三种点击场景的处理策略：
  // 1. 父级分组菜单 → 展开该组 + 跳转到第一个子项
  // 2. 子菜单叶子节点 → 保持父级展开 + 跳转到该页面
  // 3. 顶级叶子节点（首页） → 收起所有菜单 + 跳转到首页
  //
  // 🐛 注意：Ant Design 的 SubMenu 点击时只触发 onOpenChange，
  //    不会触发 onClick。所以场景①实际上由 onOpenChange 处理，
  //    这里的判断主要是为场景②和③服务的。
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    /**
     * 在菜单树中查找指定 key 对应的菜单项及其父级 key
     *
     * @param items  - 当前层级的菜单项数组
     * @param target - 要查找的菜单 key
     * @returns { item, parentKey? } 找到的菜单项及其父级 key（顶级项无 parentKey）
     */
    const findWithParent = (
      items: typeof menuItems,
      target: string
    ): { item: (typeof items)[number]; parentKey?: string } | undefined => {
      for (const item of items) {
        // 直接命中 → 这是顶级菜单项，没有 parentKey
        if (item.key === target) return { item };
        if (item.children) {
          const found = findWithParent(item.children, target);
          if (found) {
            // 子级找到了目标，如果没有 parentKey 说明是第二层（当前 item 就是父级）
            return found.parentKey ? found : { ...found, parentKey: item.key };
          }
        }
      }
      return undefined;
    };

    const result = findWithParent(menuItems, key);
    if (!result) return;

    // ── 场景①：父级分组菜单（有 children）→ 跳转第一个子项 ──
    if (result.item.children && result.item.children.length > 0) {
      navigate(result.item.children[0].key);
    }
    // ── 场景②：子菜单叶子节点（有 parentKey）→ 保持父级展开 ──
    else if (result.parentKey) {
      // 如果父级菜单还没展开，先展开它（防止从首页直接跳到子页时父级未展开）
      if (!openKeys.includes(result.parentKey)) {
        setOpenKeys([result.parentKey]);
      }
      navigate(key);
    }
    // ── 场景③：顶级叶子节点（无 parentKey，如首页）→ 收起所有菜单 ──
    else {
      setOpenKeys([]);
      navigate(key);
    }

    // 移动端点击菜单后关闭侧边栏
    if (isMobile && onMobileClose) onMobileClose();
  };

  // ============================================================
  // 🖼️ 渲染
  // ============================================================
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Logo / 标题区 */}
      <div className="h-16 leading-16 text-center font-bold text-gray-700 shrink-0 whitespace-nowrap overflow-hidden">
        {!collapsed ? "Work Pro" : "📊"}
      </div>

      {/* 可滚动的菜单区域 —— overflow-y-auto 保留垂直滚动条，overflow-x-hidden 防止折叠动画时文字挤压 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Menu
          theme="light"
          mode="inline"
          style={{ padding: collapsed ? "12px" : "16px", borderRight: 0 }}
          selectedKeys={selectedKeys}
          openKeys={collapsed ? [] : openKeys}
          /**
           * onOpenChange - 菜单展开/折叠变化时触发
           *
           * 手风琴模式的核心逻辑：
           * 1. 找出本次变化的 key（新展开的那个菜单）
           * 2. 只保留这一项，其他全部收起
           * 3. 展开父级菜单时自动跳转到第一个子项
           *
           * 🐛 为什么跳转逻辑放在这里而不是 handleMenuClick？
           *    Ant Design 的 SubMenu 被点击时只触发 onOpenChange，
           *    不触发 onClick（因为它认为 SubMenu 是容器不是可点击项），
           *    所以"点击父级菜单跳转第一个子项"必须在这里实现。
           */
          onOpenChange={keys => {
            // keys 是 Ant Design 内部管理的展开状态快照
            // 通过对比当前 openKeys 找出"新展开的那个 key"
            const lastKey = keys.find(key => !openKeys.includes(key));

            if (lastKey) {
              // ── 有新菜单被展开：手风琴模式，只保留这一个 ──
              setOpenKeys([lastKey]);

              // 查找展开的父级菜单项
              const findMenuItem = (
                items: typeof menuItems
              ): (typeof menuItems)[number] | undefined => {
                for (const item of items) {
                  if (item.key === lastKey) return item;
                  if (item.children) {
                    const found = findMenuItem(item.children);
                    if (found) return found;
                  }
                }
                return undefined;
              };

              const parentItem = findMenuItem(menuItems);
              // 如果展开的是父级菜单（有子项），自动导航到第一个子项
              if (parentItem?.children && parentItem.children.length > 0) {
                navigate(parentItem.children[0].key);
              }
            } else {
              // ── 没有新展开（用户点击了已展开菜单的标题来折叠）→ 同步状态 ──
              setOpenKeys(keys);
            }
          }}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </div>
    </div>
  );
}

export default MySider;
