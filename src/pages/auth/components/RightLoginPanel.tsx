import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { FormProps } from "antd";

import AuthCard from "./AuthCard";
import LoginForm, { type LoginFieldType } from "./LoginForm";
import RegisterForm, { type RegisterFieldType } from "./RegisterForm";
import ForgotPasswordForm, { type ForgotPasswordFieldType } from "./ForgotPasswordForm";
import type { AppDispatch, RootState } from "@/store";
import { forgets, logins, registers } from "@/store/reducers/auth.async.reducer";

type AuthMode = "login" | "register" | "forgot-password";

const RightLoginPanel: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Redux state
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // 如果已认证，重定向到首页
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // 登录处理函数
  const onLoginFinish: FormProps<LoginFieldType>["onFinish"] = async values => {
    if (!values.username || !values.password) {
      message.error("请填写所有必填字段");
      return;
    } else {
      const result = await dispatch(
        logins({ username: values.username, password: values.password })
      ).unwrap();
      if (result.success) {
        message.success("登陆成功");
        navigate("/");
      } else {
        message.error(result.message || "登陆失败");
      }
    }
  };

  const onLoginFinishFailed: FormProps<LoginFieldType>["onFinishFailed"] = errorInfo => {
    console.log("Login Failed:", errorInfo);
    message.error("请检查表单填写是否正确");
  };

  // 注册处理函数
  const onRegisterFinish: FormProps<RegisterFieldType>["onFinish"] = async values => {
    if (!values.username || !values.password) {
      message.error("请填写所有必填字段");
      return;
    } else {
      const result = await dispatch(
        registers({ username: values.username, password: values.password })
      ).unwrap();
      if (result.success) {
        message.success("注册成功");
        setAuthMode("login");
      } else {
        message.error(result.message || "注册失败");
      }
    }
  };

  const onRegisterFinishFailed: FormProps<RegisterFieldType>["onFinishFailed"] = errorInfo => {
    console.log("Register Failed:", errorInfo);
    message.error("请检查表单填写是否正确");
  };

  // 忘记密码处理函数
  const onForgotPasswordFinish: FormProps<ForgotPasswordFieldType>["onFinish"] = async values => {
    if (!values.username || !values.password || !values.confirmPassword) {
      message.error("请填写所有必填字段");
      return;
    } else {
      const result = await dispatch(
        forgets({ username: values.username, password: values.confirmPassword })
      ).unwrap();
      if (result.success) {
        message.success("修改成功");
        setAuthMode("login");
      } else {
        message.error(result.message || "修改失败");
      }
    }
  };

  const onForgotPasswordFinishFailed: FormProps<ForgotPasswordFieldType>["onFinishFailed"] =
    errorInfo => {
      console.log("Forgot Password Failed:", errorInfo);
      message.error("请检查表单填写是否正确");
    };

  // 切换表单
  const switchToRegister = () => {
    setAuthMode("register");
  };

  const switchToLogin = () => {
    setAuthMode("login");
  };

  const switchToForgotPassword = () => {
    setAuthMode("forgot-password");
  };

  // 渲染内容
  const renderForm = () => {
    switch (authMode) {
      case "login":
        return (
          <LoginForm
            onFinish={onLoginFinish}
            onFinishFailed={onLoginFinishFailed}
            loading={isLoading}
            onSwitchToRegister={switchToRegister}
            onForgotPassword={switchToForgotPassword}
          />
        );
      case "register":
        return (
          <RegisterForm
            onFinish={onRegisterFinish}
            onFinishFailed={onRegisterFinishFailed}
            loading={isLoading}
            onSwitchToLogin={switchToLogin}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordForm
            onFinish={onForgotPasswordFinish}
            onFinishFailed={onForgotPasswordFinishFailed}
            loading={isLoading}
            onSwitchToLogin={switchToLogin}
          />
        );
      default:
        return null;
    }
  };

  // 根据模式设置标题和副标题
  const getTitle = () => {
    switch (authMode) {
      case "login":
        return "欢迎回来";
      case "register":
        return "创建账户";
      case "forgot-password":
        return "重置密码";
      default:
        return "欢迎";
    }
  };

  const getSubtitle = () => {
    switch (authMode) {
      case "login":
        return "请登录您的账户继续操作";
      case "register":
        return "填写以下信息创建新账户";
      case "forgot-password":
        return "请输入您的重置密码";
      default:
        return "";
    }
  };

  // 根据模式判断是否显示返回按钮
  const getOnBack = () => {
    switch (authMode) {
      case "register":
        return switchToLogin;
      case "forgot-password":
        return switchToLogin;
      default:
        return undefined;
    }
  };

  return (
    <AuthCard title={getTitle()} subtitle={getSubtitle()} error={error} onBack={getOnBack()}>
      {renderForm()}
    </AuthCard>
  );
};

export default RightLoginPanel;
