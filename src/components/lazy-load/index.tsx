import { lazy, Suspense, type ComponentType } from "react";
import { PageLoading } from "./PageLoading";

/**
 * lazyLoad 工具函数
 * @param factory - import() 动态导入组件
 * @returns ReactNode 包裹了 Suspense 的懒加载组件
 *
 * 💡 这样在路由配置里直接写 lazyLoad(() => import('路径')) 即可
 */
export const lazyLoad = (factory: () => Promise<{ default: ComponentType }>) => {
  const Component = lazy(factory);

  return (
    <Suspense fallback={<PageLoading />}>
      <Component />
    </Suspense>
  );
};
