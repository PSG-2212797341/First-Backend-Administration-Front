/**
 * 数据导出工具
 * 支持 CSV 和 JSON 格式导出
 */

/** 导出配置 */
interface ExportOptions {
  filename?: string;
  bom?: boolean; // 是否添加 BOM（解决 Excel 中文乱码）
}

/**
 * 导出为 CSV 格式
 * @param data 数据数组
 * @param columns 列配置（用于表头）
 * @param options 导出选项
 */
export function exportToCSV(
  data: Record<string, unknown>[],
  columns: { title: string; dataIndex?: string }[],
  options: ExportOptions = {}
) {
  const { filename = `export_${Date.now()}`, bom = true } = options;

  // 提取表头
  const headers = columns.filter(col => col.dataIndex).map(col => col.title);

  // 提取数据行
  const rows = data.map(item =>
    columns
      .filter(col => col.dataIndex)
      .map(col => {
        const value = item[col.dataIndex!];
        // 处理特殊字符（逗号、引号、换行）
        const str = String(value ?? "");
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      })
      .join(",")
  );

  // 组装 CSV 内容
  let csvContent = headers.join(",") + "\n" + rows.join("\n");

  // 添加 BOM 解决 Excel 中文乱码
  if (bom) {
    csvContent = "\uFEFF" + csvContent;
  }

  // 创建下载
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${filename}.csv`);
}

/**
 * 导出为 JSON 格式
 */
export function exportToJSON(data: Record<string, unknown>[], options: ExportOptions = {}) {
  const { filename = `export_${Date.now()}` } = options;
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  downloadBlob(blob, `${filename}.json`);
}

/**
 * 下载 Blob 文件
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
