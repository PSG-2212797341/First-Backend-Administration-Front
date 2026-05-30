// src/pages/auth/login.tsx
import React, { useEffect, useRef } from "react";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; // 🚀 引入 useLocation
import axios from "axios";

import type { FormProps, InputRef } from "antd"; // 🚀 引入 InputRef 用于强类型输入框引用

import AuthLayout from "./AuthLayout";
import type { AppDispatch, RootState } from "@/store";
import { logins } from "@/store/slices/auth.slice";

interface LoginFormValues {
  username?: string;
  password?: string;
  remember?: boolean;
}

// 🚀 严格定义路由传递的 state 类型约束
interface LocationState {
  registeredUsername?: string;
}

const REMEMBER_ME_KEY = "admin_remember_user";

const LoginPage: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // 🚀 获取路由状态，并对其进行类型断言，彻底封杀 any
  const location = useLocation();
  const routerState = location.state as LocationState | null;

  // 🚀 用于将光标直接聚焦到密码输入框的 Ref 钩子
  const passwordInputRef = useRef<InputRef>(null);

  const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // 🚀 核心逻辑：处理“记住我”与“注册成功自动回填账号”的完美交织
  useEffect(() => {
    // 优先级别 1：看看是不是从注册页跳过来的，有的话优先填入刚注册的账号
    if (routerState?.registeredUsername) {
      form.setFieldsValue({
        username: routerState.registeredUsername,
        remember: false, // 刚注册完，让用户自行决定要不要记住
      });

      // 体验爽点：既然账号自动填好了，直接帮用户把光标移到密码输入框
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
      return;
    }

    // 优先级别 2：如果没有注册账户传过来，再去看本地有没有“记住我”的旧账密
    const savedUser = localStorage.getItem(REMEMBER_ME_KEY);
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as Required<Omit<LoginFormValues, "remember">>;
        form.setFieldsValue({
          username: parsed.username,
          password: parsed.password,
          remember: true,
        });
      } catch {
        localStorage.removeItem(REMEMBER_ME_KEY);
      }
    }
  }, [form, routerState]);

  const handleFinish = async (values: LoginFormValues) => {
    if (!values.username || !values.password) return;
    try {
      const result = await dispatch(
        logins({ username: values.username, password: values.password })
      ).unwrap();

      if (result.success) {
        if (values.remember) {
          localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify({ username: values.username }));
        } else {
          localStorage.removeItem(REMEMBER_ME_KEY);
        }
        message.success("登录成功");
        navigate("/");
      }
    } catch (err: unknown) {
      let errorMsg = "登录失败，请检查账密";
      if (axios.isAxiosError<{ message?: string }>(err)) {
        errorMsg = err.response?.data?.message || errorMsg;
      } else if (typeof err === "string") {
        errorMsg = err;
      }
      message.error(errorMsg);
    }
  };

  const handleFinishFailed: FormProps<LoginFormValues>["onFinishFailed"] = errorInfo => {
    console.log("登录表单校验失败:", errorInfo);
    message.error("请填写完整的用户名和密码！");
  };

  return (
    <AuthLayout title="欢迎回来" subtitle="请登录您的账户继续操作">
      <Form
        form={form}
        name="login_form"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="请输入用户名"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password
            ref={passwordInputRef} // 🚀 绑定 Ref，实现自动聚焦
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="请输入密码"
            disabled={isLoading}
          />
        </Form.Item>

        <div className="flex justify-between items-center mb-6">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-gray-600" disabled={isLoading}>
              记住我
            </Checkbox>
          </Form.Item>
          <Button
            type="link"
            className="p-0 h-auto text-blue-600 text-sm border-0 bg-transparent shadow-none hover:text-blue-800"
            onClick={() => navigate("/auth/forgot-password")}
          >
            忘记密码?
          </Button>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 rounded-lg font-medium shadow-md"
            loading={isLoading}
            disabled={isLoading}
          >
            登录
          </Button>
        </Form.Item>

        <Divider plain className="text-gray-400">
          或
        </Divider>
        <div className="text-center text-sm">
          <span className="text-gray-600">还没有账户? </span>
          <Button
            type="link"
            className="p-0 h-auto text-blue-600 font-medium border-0 bg-transparent shadow-none hover:text-blue-800"
            onClick={() => navigate("/auth/register")}
            disabled={isLoading}
          >
            立即注册
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
