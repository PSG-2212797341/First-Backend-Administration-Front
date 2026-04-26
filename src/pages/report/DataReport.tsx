import { useState, useEffect } from "react";
import { Card, Row, Col, Table, Tag, Typography, Statistic, Button } from "antd";
import {
  DownloadOutlined,
  DatabaseOutlined,
  ThunderboltOutlined,
  AimOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { generateTableData } from "@/mock/tableData";
import type { TableDataItem } from "@/mock/tableData";
import { getTableStats } from "@/mock/tableData";
import { exportToCSV } from "@/utils/export";

const { Title } = Typography;

/** 按分类统计 */
function getCategoryStats(data: TableDataItem[]) {
  const map = new Map<string, { count: number; totalCalls: number }>();
  data.forEach(item => {
    const existing = map.get(item.category) || { count: 0, totalCalls: 0 };
    existing.count++;
    existing.totalCalls += item.callCount;
    map.set(item.category, existing);
  });
  return Array.from(map.entries()).map(([category, stats]) => ({
    category,
    count: stats.count,
    totalCalls: stats.totalCalls,
    avgCalls: Math.round(stats.totalCalls / stats.count),
  }));
}

/** 按状态统计 */
function getStatusStats(data: TableDataItem[]) {
  const map = new Map<string, number>();
  data.forEach(item => {
    map.set(item.status, (map.get(item.status) || 0) + 1);
  });
  return Array.from(map.entries()).map(([status, count]) => ({ status, count }));
}

const statusConfig: Record<string, { text: string; color: string }> = {
  active: { text: "启用", color: "green" },
  inactive: { text: "禁用", color: "red" },
  pending: { text: "待审核", color: "orange" },
};

function DataReport() {
  const [data, setData] = useState<TableDataItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateTableData(5000));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = getTableStats(data);
  const categoryStats = getCategoryStats(data);
  const statusStats = getStatusStats(data);

  // 分类统计表格列
  const categoryColumns = [
    { title: "分类", dataIndex: "category", key: "category" },
    {
      title: "数量",
      dataIndex: "count",
      key: "count",
      sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    },
    {
      title: "总调用次数",
      dataIndex: "totalCalls",
      key: "totalCalls",
      render: (v: number) => v.toLocaleString(),
      sorter: (a: { totalCalls: number }, b: { totalCalls: number }) => a.totalCalls - b.totalCalls,
    },
    {
      title: "平均调用次数",
      dataIndex: "avgCalls",
      key: "avgCalls",
      render: (v: number) => v.toLocaleString(),
    },
  ];

  // 状态统计表格列
  const statusColumns = [
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const cfg = statusConfig[status];
        return <Tag color={cfg?.color}>{cfg?.text || status}</Tag>;
      },
    },
    { title: "数量", dataIndex: "count", key: "count" },
    {
      title: "占比",
      key: "ratio",
      render: (_: unknown, record: { count: number }) => {
        const ratio = data.length > 0 ? ((record.count / data.length) * 100).toFixed(1) : "0";
        return `${ratio}%`;
      },
    },
  ];

  const handleExport = () => {
    exportToCSV(
      data as unknown as Record<string, unknown>[],
      [
        { title: "编号", dataIndex: "code" },
        { title: "描述", dataIndex: "description" },
        { title: "调用次数", dataIndex: "callCount" },
        { title: "状态", dataIndex: "status" },
        { title: "分类", dataIndex: "category" },
        { title: "更新时间", dataIndex: "updateTime" },
      ],
      { filename: `数据报表_${new Date().toISOString().slice(0, 10)}` }
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>
            数据报表
          </Title>
        </Col>
        <Col>
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
            导出 CSV
          </Button>
        </Col>
      </Row>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="数据总量"
              value={stats.total}
              prefix={<DatabaseOutlined style={{ color: "#1677ff" }} />}
              suffix="条"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总调用次数"
              value={stats.totalCalls}
              prefix={<ThunderboltOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="平均调用次数"
              value={stats.avgCalls}
              prefix={<AimOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="启用数量"
              value={stats.active}
              prefix={<CheckCircleOutlined style={{ color: "#722ed1" }} />}
              suffix={`/ ${stats.total}`}
            />
          </Card>
        </Col>
      </Row>

      {/* 统计表格 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="分类统计" size="small">
            <Table
              columns={categoryColumns}
              dataSource={categoryStats}
              rowKey="category"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="状态分布" size="small">
            <Table
              columns={statusColumns}
              dataSource={statusStats}
              rowKey="status"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DataReport;
