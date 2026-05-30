// src/pages/auth/forgot-password.tsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Divider, message } from "antd";
import { UserOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 🚀 导入官方表单相关 Props 与错误实体类型定义
import type { FormProps } from "antd";

import AuthLayout from "./AuthLayout";
import type { AppDispatch, RootState } from "@/store";
import { forgets } from "@/store/slices/auth.slice";
import { sendCode, verifyCode } from "@/api/auth.api";

interface ForgotPasswordFormValues {
  username?: string;
  password?: string;
  confirmPassword?: string;
  code?: string;
}

interface BackendErrorResponse {
  success: boolean;
  message: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [form] = Form.useForm<ForgotPasswordFormValues>();
  const [countdown, setCountdown] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // 发送验证码
  const handleSendCode = async () => {
    try {
      await form.validateFields(["username"]);
      const username = form.getFieldValue("username");

      message.loading({ content: "正在发送验证码...", key: "sendCode" });
      await sendCode({ username });
      message.success({ content: "验证码已成功发送至您的注册邮箱", key: "sendCode" });
      setCountdown(60);
    } catch (err: unknown) {
      // 💡 完美替代：直接判断结构中是否存在 errorFields，不需要依赖任何第三方 interface
      if (err && typeof err === "object" && "errorFields" in err) {
        return; // 前端校验（如用户名没填）未通过，直接拦截，不弹出后端的错误提示
      }

      let errorMsg = "验证码发送失败";
      if (axios.isAxiosError<BackendErrorResponse>(err)) {
        errorMsg = err.response?.data?.message || errorMsg;
      }
      message.error({ content: errorMsg, key: "sendCode" });
    }
  };

  // 🟢 核心一：表单全部验证成功，回车或点击按钮触发
  const handleFinish = async (values: ForgotPasswordFormValues) => {
    if (!values.username || !values.password || !values.code) return;
    try {
      const result = await dispatch(
        forgets({ username: values.username, password: values.password, code: values.code })
      ).unwrap();

      if (result && result.success) {
        message.success("密码重置成功，请使用新密码登录");
        localStorage.removeItem("admin_remember_user");
        navigate("/auth/login");
      } else {
        message.error(result?.message || "重置密码失败，请检查验证码");
      }
    } catch (err: unknown) {
      let errorMsg = "验证码错误或已过期";
      if (axios.isAxiosError<{ message?: string }>(err)) {
        errorMsg = err.response?.data?.message || errorMsg;
      } else if (typeof err === "string") {
        errorMsg = err;
      }

      // 💡 优化：如果是验证码错误，直接让输入框爆红，不刷新不丢数据，体验最好
      if (errorMsg.includes("验证码") || errorMsg.includes("code")) {
        form.setFields([
          {
            name: "code",
            errors: [errorMsg],
          },
        ]);
      } else {
        message.error(errorMsg);
      }
    }
  };

  // 🔴 核心二：前端校验未通过时触发（比如密码位数不够，回车被拦截）
  const handleFinishFailed: FormProps<ForgotPasswordFormValues>["onFinishFailed"] = errorInfo => {
    console.log("表单验证失败:", errorInfo);
    message.error("请检查表单中填写错误的项！");
  };

  return (
    <AuthLayout
      title="重置密码"
      subtitle="使用绑定的邮箱验证码重置您的密码"
      onBack={() => navigate("/auth/login")}
    >
      <Form
        form={form}
        name="forgot_password_form"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { min: 3, message: "用户名至少3个字符" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="请输入用户名"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="password"
          rules={[
            { required: true, message: "请输入密码!" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: "密码最少8位，且必须同时包含大小写字母与数字",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="请输入密码"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请再次输入密码!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) return Promise.resolve();
                return Promise.reject(new Error("两次输入的密码不一致!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="请再次输入密码"
            disabled={isLoading}
          />
        </Form.Item>

        <Row gutter={8} className="mb-6">
          {/* 🌟 左侧：占 14 份 */}
          <Col span={14}>
            <Form.Item
              label="验证码" // 🚀 留在这里没问题，但要配合右侧的无形占位
              name="code"
              className="mb-0" // 保持底部紧凑
              validateTrigger="onBlur" // 失焦再校验，体验更丝滑
              rules={[
                { required: true, message: "请输入验证码!" },
                { len: 6, message: "验证码必须是6位" },
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (!value || value.length !== 6) {
                      return Promise.resolve();
                    }
                    const username = getFieldValue("username");
                    if (!username) {
                      return Promise.reject(new Error("请先输入用户名/邮箱再验证验证码"));
                    }
                    try {
                      const res = (await verifyCode({
                        username,
                        code: value,
                      })) as unknown as { success: boolean }; // 确保类型兼容你的解壳响应

                      if (res.success) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(new Error("验证码错误"));
                      }
                    } catch {
                      return Promise.reject(new Error("验证码错误或已过期"));
                    }
                  },
                }),
              ]}
            >
              <Input
                prefix={<SafetyOutlined className="text-gray-400" />}
                placeholder="6位验证码"
                className="h-12"
                maxLength={6}
                disabled={isLoading}
              />
            </Form.Item>
          </Col>

          {/* 🌟 右侧：占 10 份 */}
          {/* 核心修正：利用 h-full 以及特定的 items-end，或者加一个隐形的 Form.Item Label 占位，这是大厂最稳的做法 */}
          <Col span={10} className="flex flex-col justify-end">
            {/* 🚀 极其精妙：加一个空内容的 label，专门用来把右侧的按钮撑到跟左边输入框【绝对平齐】的高度！ */}
            <Form.Item label=" " className="mb-0">
              <Button
                type="default"
                block
                className="h-12 text-sm w-full" // h-12 确保与左边 Input 高度 100% 对齐
                disabled={countdown > 0 || isLoading}
                onClick={handleSendCode}
              >
                {countdown > 0 ? `${countdown}s 后重试` : "获取验证码"}
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          {/* htmlType="submit" 保证了全表单回车自动提交 */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 rounded-lg font-medium shadow-md"
            loading={isLoading}
            disabled={isLoading}
          >
            重置密码
          </Button>
        </Form.Item>

        <Divider plain className="text-gray-400">
          或
        </Divider>
        <div className="text-center text-sm">
          <span className="text-gray-600">想起密码了? </span>
          <Button
            type="default"
            className="p-0 h-auto text-blue-600 font-medium border-0 bg-transparent shadow-none hover:text-blue-800"
            onClick={() => navigate("/auth/login")}
            disabled={isLoading}
          >
            返回登录
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
