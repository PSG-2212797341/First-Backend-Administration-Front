import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Tabs,
  Table,
  Checkbox,
  Tag,
  Avatar,
  Divider,
  Space,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  SolutionOutlined,
  DatabaseOutlined,
  EditOutlined,
  UserAddOutlined,
  CopyOutlined,
  ExportOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

// --- 模拟数据 ---

// 1. 顶部权限概览
const overviewData = [
  {
    title: "角色数量",
    value: "7",
    sub: "较昨日 ↑ 2",
    icon: <SafetyCertificateOutlined />,
    bg: "bg-blue-50 text-blue-600",
  },
  {
    title: "用户数量",
    value: "142",
    sub: "较昨日 ↑ 6",
    icon: <UserOutlined />,
    bg: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "权限策略",
    value: "36",
    sub: "较昨日 ↑ 1",
    icon: <SolutionOutlined />,
    bg: "bg-purple-50 text-purple-600",
  },
  {
    title: "数据范围",
    value: "12",
    sub: "较昨日 ↑ 3",
    icon: <DatabaseOutlined />,
    bg: "bg-orange-50 text-orange-600",
  },
];

// 2. 左侧角色列表
const initialRoles = [
  {
    id: "1",
    name: "超级管理员",
    isSystem: true,
    count: 8,
    code: "super_admin",
    desc: "拥有系统最高管理权限，可管理所有配置。",
    time: "2024-01-15 10:30:00",
  },
  {
    id: "2",
    name: "系统管理员",
    isSystem: false,
    count: 12,
    code: "sys_admin",
    desc: "拥有系统核心管理权限，可管理用户、角色及系统设置。",
    time: "2024-01-15 10:30:00",
  },
  {
    id: "3",
    name: "产品经理",
    isSystem: false,
    count: 15,
    code: "product_manager",
    desc: "负责产品内容管理、订单管理与产品数据看板查看。",
    time: "2024-02-10 14:22:15",
  },
  {
    id: "4",
    name: "运营人员",
    isSystem: false,
    count: 28,
    code: "operator",
    desc: "负责日常内容发布、评论审核及基础业务数据导出。",
    time: "2024-03-01 09:15:00",
  },
  {
    id: "5",
    name: "业务人员",
    isSystem: false,
    count: 56,
    code: "business",
    desc: "主要负责订单创建、客户跟进以及销售数据查看。",
    time: "2024-03-15 16:40:00",
  },
  {
    id: "6",
    name: "普通成员",
    isSystem: false,
    count: 95,
    code: "member",
    desc: "系统基础普通用户，仅拥有常用工作台的查看与基本操作权限。",
    time: "2024-04-01 11:00:00",
  },
  {
    id: "7",
    name: "访客",
    isSystem: false,
    count: 8,
    code: "guest",
    desc: "只读权限，用于临时外包或审计人员查看系统。",
    time: "2024-05-01 10:00:00",
  },
];

// 3. 中间权限配置矩阵 (树形菜单权限表)
const initialMatrixData = [
  {
    key: "1",
    name: "工作台",
    super_admin: true,
    sys_admin: true,
    product_manager: true,
    operator: true,
    business: true,
    member: true,
    guest: true,
  },
  {
    key: "2",
    name: "数据概览",
    super_admin: true,
    sys_admin: true,
    product_manager: true,
    operator: true,
    business: true,
    member: false,
    guest: true,
    isParent: true,
  },
  {
    key: "2-1",
    name: "数据看板",
    super_admin: true,
    sys_admin: true,
    product_manager: true,
    operator: true,
    business: true,
    member: false,
    guest: true,
    isChild: true,
  },
  {
    key: "2-2",
    name: "报表管理",
    super_admin: true,
    sys_admin: true,
    product_manager: true,
    operator: true,
    business: true,
    member: false,
    guest: false,
    isChild: true,
  },
  {
    key: "3",
    name: "用户管理",
    super_admin: true,
    sys_admin: true,
    product_manager: false,
    operator: false,
    business: false,
    member: false,
    guest: false,
    isParent: true,
  },
  {
    key: "3-1",
    name: "用户列表",
    super_admin: true,
    sys_admin: true,
    product_manager: false,
    operator: false,
    business: false,
    member: false,
    guest: false,
    isChild: true,
  },
  {
    key: "3-2",
    name: "用户分组",
    super_admin: true,
    sys_admin: true,
    product_manager: false,
    operator: false,
    business: false,
    member: false,
    guest: false,
    isChild: true,
  },
  {
    key: "3-3",
    name: "角色管理",
    super_admin: true,
    sys_admin: true,
    product_manager: false,
    operator: false,
    business: false,
    member: false,
    guest: false,
    isChild: true,
  },
  {
    key: "4",
    name: "内容管理",
    super_admin: true,
    sys_admin: true,
    product_manager: true,
    operator: true,
    business: false,
    member: false,
    guest: false,
    isParent: true,
  },
  {
    key: "4-1",
    name: "文章管理",
    super_admin: true,
    sys_admin: true,
    product_manager: true,
    operator: true,
    business: false,
    member: false,
    guest: false,
    isChild: true,
  },
  {
    key: "4-2",
    name: "评论管理",
    super_admin: true,
    sys_admin: true,
    product_manager: true,
    operator: true,
    business: false,
    member: false,
    guest: false,
    isChild: true,
  },
];

// 4. 权限变更日志
const logData = [
  {
    key: "1",
    time: "2024-05-20 14:35:21",
    operator: "张管理员",
    type: "新增角色",
    content: "新增角色：测试人员",
    scope: "2 人",
  },
  {
    key: "2",
    time: "2024-05-20 11:20:15",
    operator: "李四",
    type: "修改权限",
    content: "修改角色：运营人员 的菜单权限",
    scope: "28 人",
  },
  {
    key: "3",
    time: "2024-05-19 16:45:30",
    operator: "王五",
    type: "添加成员",
    content: "添加成员：赵六 至 业务人员",
    scope: "1 人",
  },
  {
    key: "4",
    time: "2024-05-19 09:12:08",
    operator: "张管理员",
    type: "删除角色",
    content: "删除角色：临时角色",
    scope: "0 人",
  },
];

export default function Center() {
  const [roles, setRoles] = useState(initialRoles);
  const [activeRoleId, setActiveRoleId] = useState("2"); // 默认选中系统管理员
  const [matrixData, setMatrixData] = useState(initialMatrixData);
  const [searchRoleQuery, setSearchRoleQuery] = useState("");

  // 获取当前选中的角色详情
  const currentRole = roles.find(r => r.id === activeRoleId) || roles[0];

  // 过滤左侧角色
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchRoleQuery.toLowerCase())
  );

  // 模拟切换矩阵中的复选框勾选状态
  const handleCheckboxChange = (recordKey, roleCode) => {
    setMatrixData(prev =>
      prev.map(item => {
        if (item.key === recordKey) {
          return { ...item, [roleCode]: !item[roleCode] };
        }
        return item;
      })
    );
    message.success("权限配置已实时同步更新");
  };

  // 矩阵表格列定义
  const matrixColumns = [
    {
      title: "菜单名称",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        if (record.isChild) {
          return (
            <span className="pl-6 text-gray-500 text-xs flex items-center gap-1">
              ├─{" "}
              <Checkbox
                defaultChecked={
                  record.key.startsWith("2") ||
                  record.key.startsWith("3") ||
                  record.key.startsWith("4-1")
                }
              >
                {text}
              </Checkbox>
            </span>
          );
        }
        return (
          <span
            className={`text-xs ${record.isParent ? "font-bold text-gray-800" : "font-medium"}`}
          >
            {record.isParent ? "▼ " : ""}
            {text}
          </span>
        );
      },
    },
    // 为每个角色动态生成一列映射复选框
    ...roles.map(role => ({
      title: (
        <div className="flex flex-col items-center text-[11px] font-normal text-gray-400">
          <span className={role.id === activeRoleId ? "text-blue-500 font-bold" : ""}>
            {role.name}
          </span>
        </div>
      ),
      dataIndex: role.code,
      key: role.code,
      align: "center",
      width: 85,
      render: (checked, record) => (
        <Checkbox
          checked={checked}
          disabled={role.id === "1"} // 超级管理员禁止修改
          onChange={() => handleCheckboxChange(record.key, role.code)}
        />
      ),
    })),
  ];

  // 变更日志列定义
  const logColumns = [
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      width: 160,
      render: t => <span className="font-mono text-gray-400">{t}</span>,
    },
    { title: "操作人", dataIndex: "operator", key: "operator" },
    {
      title: "操作类型",
      dataIndex: "type",
      key: "type",
      render: type => <Tag className="border-0 bg-gray-100 text-gray-600 text-[11px]">{type}</Tag>,
    },
    {
      title: "变更内容",
      dataIndex: "content",
      key: "content",
      className: "text-gray-600 font-sans",
    },
    { title: "影响范围", dataIndex: "scope", key: "scope" },
    {
      title: "操作",
      key: "action",
      align: "right",
      render: () => (
        <Button type="text" size="small" className="text-blue-500 hover:underline text-xs">
          查看
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fc] p-6 text-gray-800">
      {/* --- 顶部面包屑与标题区 --- */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
          <span>首页</span>
          <span>/</span>
          <span>系统设置</span>
          <span>/</span>
          <span className="text-gray-600">权限管理</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">权限管理</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          管理角色权限、成员权限及数据权限，保障系统安全可控
        </p>
      </div>

      {/* --- 权限概览卡片 (加深阴影) --- */}
      <Row gutter={[16, 16]} className="mb-6">
        {overviewData.map((item, idx) => (
          <Col xs={12} sm={12} md={6} key={idx}>
            <Card
              bordered={false}
              className="rounded-xl border border-gray-100/40 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl text-lg ${item.bg}`}>{item.icon}</div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">{item.title}</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-bold text-gray-900 font-mono">{item.value}</span>
                    <span className="text-[10px] text-emerald-500 font-medium flex items-center">
                      <ArrowUpOutlined className="scale-75" />
                      {item.sub}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- 核心核心三栏流控制布局 --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6 items-start">
        {/* 1. 左侧：角色管理组栏 (占比 3/12) */}
        <Card
          bordered={false}
          className="lg:col-span-3 rounded-xl shadow-md bg-white body-no-padding min-h-[580px] flex flex-col justify-between"
        >
          <div>
            <div className="p-4 border-b border-gray-50">
              <div className="text-xs font-bold text-gray-800 mb-2.5">角色管理</div>
              <Input
                prefix={<SearchOutlined className="text-gray-300" />}
                placeholder="搜索角色名称"
                size="middle"
                className="rounded-lg border-gray-200 text-xs"
                value={searchRoleQuery}
                onChange={e => setSearchRoleQuery(e.target.value)}
              />
              <Button
                type="primary"
                block
                icon={<PlusOutlined />}
                className="mt-3 rounded-lg bg-blue-500 border-none shadow-sm text-xs h-9"
              >
                新建角色
              </Button>
            </div>

            {/* 角色单选列表 */}
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {filteredRoles.map(role => (
                <div
                  key={role.id}
                  onClick={() => setActiveRoleId(role.id)}
                  className={`p-3.5 flex items-center justify-between cursor-pointer transition-all relative ${
                    activeRoleId === role.id
                      ? "bg-blue-50/50 text-blue-600"
                      : "hover:bg-gray-50/50 text-gray-600"
                  }`}
                >
                  {activeRoleId === role.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                  )}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full ${role.id === "1" ? "bg-purple-500" : "bg-blue-500"} ${activeRoleId === role.id ? "scale-110" : "opacity-60"}`}
                    />
                    <span className="text-xs font-bold truncate">{role.name}</span>
                    {role.isSystem && (
                      <Tag color="purple" className="border-0 text-[9px] px-1 scale-90">
                        系统
                      </Tag>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono shrink-0">
                    {role.count} 人
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-50 bg-gray-50/20">
            <Button
              type="text"
              size="small"
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
            >
              🗑️ 回收站
            </Button>
          </div>
        </Card>

        {/* 2. 中间：权限勾选配置矩阵 (占比 6/12) */}
        <Card
          bordered={false}
          className="lg:col-span-6 rounded-xl shadow-md bg-white min-h-[580px]"
        >
          <div className="border-b border-gray-100 pb-1 mb-4">
            <Tabs
              defaultActiveKey="menu"
              className="message-tabs text-xs"
              items={[
                { key: "menu", label: <span className="text-xs font-bold px-1">菜单权限</span> },
                { key: "data", label: <span className="text-xs font-bold px-1">数据权限</span> },
                { key: "api", label: <span className="text-xs font-bold px-1">接口权限</span> },
                { key: "field", label: <span className="text-xs font-bold px-1">字段权限</span> },
              ]}
            />
          </div>

          <div className="mb-3 flex items-center justify-between">
            <Input
              prefix={<SearchOutlined className="text-gray-300" />}
              placeholder="搜索菜单名称"
              size="small"
              className="w-48 rounded-md border-gray-200 text-xs"
            />
            <div className="text-[11px] text-gray-400">提示：勾选直接赋予对应角色菜单查看权</div>
          </div>

          {/* 复杂嵌套权限交叉矩阵 */}
          <Table
            columns={matrixColumns}
            dataSource={matrixData}
            pagination={false}
            size="small"
            bordered
            className="border border-gray-100 rounded-lg overflow-hidden text-xs permission-matrix-table"
          />
        </Card>

        {/* 3. 右侧：当前选中角色详情与快捷动作栏 (占比 3/12) */}
        <Card
          bordered={false}
          className="lg:col-span-3 rounded-xl shadow-md bg-white min-h-[580px] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-4">
              <span className="text-xs font-bold text-gray-800">角色详情</span>
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                className="text-xs p-0 text-blue-500"
              >
                编辑
              </Button>
            </div>

            <div className="text-center py-2">
              <Avatar
                size={48}
                icon={<UserOutlined />}
                className="bg-blue-500/10 text-blue-500 mb-2"
              />
              <div className="text-sm font-bold text-gray-800 flex items-center justify-center gap-1.5">
                {currentRole.name}
              </div>
              <div className="text-[11px] font-mono text-gray-400 mt-0.5">{currentRole.code}</div>
            </div>

            <Divider className="my-3.5 border-gray-100" />

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-gray-400 font-medium mb-1">角色描述</div>
                <div className="text-gray-600 leading-relaxed bg-gray-50/60 border border-gray-100/50 p-2.5 rounded-lg">
                  {currentRole.desc}
                </div>
              </div>
              <div>
                <div className="text-gray-400 font-medium mb-0.5">创建时间</div>
                <div className="text-gray-700 font-mono">{currentRole.time}</div>
              </div>
              <div>
                <div className="text-gray-400 font-medium mb-0.5">成员数量</div>
                <div className="text-gray-700 font-bold font-mono">{currentRole.count} 人</div>
              </div>
            </div>
          </div>

          {/* 快捷操作动作按钮面板 */}
          <div className="border-t border-gray-50 pt-4 mt-6 space-y-2">
            <div className="text-[11px] font-bold text-gray-400 mb-1">快捷操作</div>
            <Button
              block
              size="middle"
              icon={<UserAddOutlined />}
              className="text-xs rounded-lg border-gray-200 text-left px-3 text-gray-600 flex items-center gap-2 hover:border-blue-500"
            >
              添加成员
            </Button>
            <Button
              block
              size="middle"
              icon={<CopyOutlined />}
              className="text-xs rounded-lg border-gray-200 text-left px-3 text-gray-600 flex items-center gap-2 hover:border-blue-500"
            >
              复制角色
            </Button>
            <Button
              block
              size="middle"
              icon={<ExportOutlined />}
              className="text-xs rounded-lg border-gray-200 text-left px-3 text-gray-600 flex items-center gap-2 hover:border-blue-500"
            >
              导出权限
            </Button>

            <Popconfirm
              title="确定要删除该角色吗？"
              description="删除后拥有该角色的成员将失去对应权限，请谨慎操作。"
              okText="确定"
              cancelText="取消"
              disabled={currentRole.id === "1"}
            >
              <Button
                block
                danger
                size="middle"
                icon={<DeleteOutlined />}
                className="text-xs rounded-lg text-left px-3 flex items-center gap-2 mt-2"
                disabled={currentRole.id === "1"}
              >
                删除角色
              </Button>
            </Popconfirm>
          </div>
        </Card>
      </div>

      {/* --- 4. 底部权限变更日志区 (加深阴影) --- */}
      <Card
        bordered={false}
        title={<span className="text-sm font-bold text-gray-800">权限变更日志</span>}
        extra={
          <Button type="link" size="small" className="text-xs text-blue-500">
            查看更多 ＞
          </Button>
        }
        className="rounded-xl shadow-md bg-white overflow-hidden"
      >
        <Table
          columns={logColumns}
          dataSource={logData}
          pagination={false}
          size="middle"
          className="text-xs"
        />
      </Card>

      {/* --- 页脚声明 --- */}
      <footer className="text-center text-[11px] text-gray-400 mt-8 font-mono">
        © 2024 WorkPro. All rights reserved.
      </footer>
    </div>
  );
}
