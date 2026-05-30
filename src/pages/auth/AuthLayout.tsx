// src/pages/auth/AuthLayout.tsx
import React from "react";
import { Row, Col, Card, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import loginPng from "@/assets/png/login.png";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onBack?: () => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children, onBack }) => {
  return (
    <div className="min-h-screen bg-linear-to-br flex items-center justify-center p-4">
      <div className="w-full">
        <Row gutter={[48, 32]} className="items-center" justify="center">
          <Col xs={0} md={12} lg={10} className="text-center">
            <img src={loginPng} alt="Auth Illustration" />
          </Col>

          <Col xs={24} md={12} lg={10} className="flex justify-center">
            <div className="w-full max-w-md mx-auto">
              <Card
                className="shadow-4xs rounded-2xl border-0 bg-white/95 backdrop-blur-sm"
                variant="borderless"
              >
                <div className="mb-8 relative">
                  {onBack && (
                    <Button
                      type="text"
                      icon={<ArrowLeftOutlined />}
                      className="absolute left-0 top-0 text-gray-600 hover:text-gray-800 -ml-2"
                      onClick={onBack}
                    >
                      返回
                    </Button>
                  )}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <p className="text-gray-500 text-center mt-2">{subtitle}</p>
                  </div>
                </div>

                {children}
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthLayout;
