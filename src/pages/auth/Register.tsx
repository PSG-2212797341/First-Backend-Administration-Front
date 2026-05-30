// src/pages/auth/register.tsx
import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 🚀 引入 Form 属性接口，确保类型安全
import type { FormProps } from "antd";

import AuthLayout from "./AuthLayout";
import type { AppDispatch, RootState } from "@/store";
import { registers } from "@/store/slices/auth.slice";

interface RegisterFormValues {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: boolean;
}

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // 🟢 核心一：前端字段规则、密码一致性检验全部合规，才会执行最终的注册业务请求
  const handleFinish = async (values: RegisterFormValues) => {
    if (!values.username || !values.password || !values.email) return;
    try {
      const result = await dispatch(
        registers({ username: values.username, password: values.password, email: values.email })
      ).unwrap();

      if (result.success) {
        message.success("注册成功！");

        // 🚀 核心修改：通过 state 隐式把刚刚注册成功的用户名传递给登录页
        navigate("/auth/login", {
          state: { registeredUsername: values.username },
        });
      }
    } catch (err: unknown) {
      let errorMsg = "注册失败，请稍后重试";
      if (axios.isAxiosError<{ message?: string }>(err)) {
        errorMsg = err.response?.data?.message || errorMsg;
      } else if (typeof err === "string") {
        errorMsg = err;
      }
      message.error(errorMsg);
    }
  };

  // 🔴 核心二：当两次输入密码不一致或未勾选条款时，直接原地拦截
  const handleFinishFailed: FormProps<RegisterFormValues>["onFinishFailed"] = errorInfo => {
    console.log("注册表单校验失败:", errorInfo);
    message.error("请完善注册信息并勾选同意服务条款！");
  };

  return (
    <AuthLayout
      title="创建账户"
      subtitle="填写以下信息创建新账户"
      onBack={() => navigate("/auth/login")}
    >
      <Form
        form={form}
        name="register_form"
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
          label="电子邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入电子邮箱!" },
            { type: "email", message: "邮箱格式不正确!" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="请输入电子邮箱"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          label="密码"
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

        <Form.Item
          name="agreeTerms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, v) =>
                v ? Promise.resolve() : Promise.reject(new Error("请同意服务条款")),
            },
          ]}
        >
          <Checkbox className="text-gray-600 text-xs" disabled={isLoading}>
            我已阅读并同意{" "}
            <a href="#" className="text-blue-600">
              服务条款
            </a>{" "}
            和{" "}
            <a href="#" className="text-blue-600">
              隐私政策
            </a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          {/* 规范回归 htmlType="submit"，交由 AntD 底层来统一托管 */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 rounded-lg font-medium shadow-md"
            loading={isLoading}
            disabled={isLoading}
          >
            注册
          </Button>
        </Form.Item>

        <Divider plain className="text-gray-400">
          或
        </Divider>
        <div className="text-center text-sm">
          <span className="text-gray-600">已有账户? </span>
          <Button
            type="link"
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

export default RegisterPage;
