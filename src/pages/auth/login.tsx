import React from "react";
import RightLoginPanel from "./components/RightLoginPanel";
import loginPng from "@/assets/png/login.png";
import { Row, Col } from "antd";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br flex items-center justify-center p-4">
      <div className="w-full">
        <Row gutter={[48, 32]} className="items-center" justify="center">
          {/* 左侧介绍区域 */}
          <Col xs={0} md={12} lg={10} className="text-center">
            <img src={loginPng} alt="" />
          </Col>

          {/* 右侧登录区域 */}
          <Col xs={24} md={12} lg={10} className="flex justify-center">
            <div className="w-full">
              <RightLoginPanel />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginPage;
