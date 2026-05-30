/**
 * 🕵️‍♂️ 根据当前浏览器的真实 URL 路径，反向推导出左侧菜单应该展开哪个父级项
 * @param pathname 例如 "/form/basic"
 * @returns 算出父级项 ["/form"]
 */
export const getOpenKeysByPath = (pathname: string): string[] => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    return [`/${segments[0]}`];
  }
  return ["/"];
};
