import React, { useState, useCallback, forwardRef } from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import type { InputProps, InputRef } from "antd";

interface MaterialInputProps extends Omit<InputProps, "placeholder"> {
  label: string;
}

const MaterialInput = forwardRef<InputRef, MaterialInputProps>(
  (
    {
      label,
      prefix,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      style,
      className = "",
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const hasValue =
      value !== undefined ? value !== "" && value !== undefined : internalValue !== "";

    const isFloating = isFocused || hasValue;

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e);
      },
      [onChange]
    );

    return (
      <div className={`relative ${className}`} style={style}>
        <div className="relative flex items-center">
          {/* 边框层 */}
          <div
            className="absolute inset-0 rounded pointer-events-none"
            style={{
              border: `1px solid ${isFocused ? "#0054fe" : "#d9d9d9"}`,
              transition: "border-color 0.2s ease",
            }}
          />

          {/* 上边框缺口遮挡层 */}
          <div
            className="absolute -top-px h-0.5 bg-white z-10 overflow-hidden"
            style={{
              left: prefix ? 44 : 16,
              width: isFloating ? "auto" : 0,
              padding: isFloating ? "0 4px" : 0,
              transition: "width 0.2s ease",
            }}
          />

          {/* Prefix 图标 */}
          {prefix && (
            <span
              className="flex items-center shrink-0 z-20 pl-3"
              style={{
                color: isFocused ? "#0054fe" : "#bfbfbf",
                transition: "color 0.2s ease",
              }}
            >
              {prefix}
            </span>
          )}

          {/* 输入框容器 */}
          <div className="relative flex-1 pl-3">
            {/* 浮动 Label */}
            <label
              className="absolute top-0 pointer-events-none whitespace-nowrap leading-none z-20 bg-white px-1"
              style={{
                left: 8,
                transform: isFloating
                  ? "translateY(-8px) scale(0.85)"
                  : "translateY(12px) scale(1)",
                transformOrigin: "left top",
                color: isFocused ? "#0054fe" : "#bfbfbf",
                transition: "transform 0.2s ease-out, color 0.2s ease",
              }}
            >
              {label}
            </label>

            {/* 输入框 */}
            <Input
              {...rest}
              ref={ref}
              value={value}
              defaultValue={defaultValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="borderless"
              className="bg-transparent border-none shadow-none outline-none text-base"
              style={{
                padding: "8px 12px 6px 0",
                ...rest.styles,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

MaterialInput.displayName = "MaterialInput";

// ========== Password 变体 ==========

interface MaterialPasswordProps extends Omit<InputProps, "placeholder" | "type"> {
  label: string;
}

const MaterialPassword = forwardRef<InputRef, MaterialPasswordProps>(
  (
    {
      label,
      prefix,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      style,
      className = "",
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const hasValue =
      value !== undefined ? value !== "" && value !== undefined : internalValue !== "";

    const isFloating = isFocused || hasValue;

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e);
      },
      [onChange]
    );

    return (
      <div className={`relative ${className}`} style={style}>
        <div className="relative flex items-center">
          {/* 边框层 */}
          <div
            className="absolute inset-0 rounded pointer-events-none"
            style={{
              border: `1px solid ${isFocused ? "#0054fe" : "#d9d9d9"}`,
              transition: "border-color 0.2s ease",
            }}
          />

          {/* 上边框缺口遮挡层 */}
          <div
            className="absolute -top-px h-0.5 bg-white z-10 overflow-hidden"
            style={{
              left: prefix ? 44 : 16,
              width: isFloating ? "auto" : 0,
              padding: isFloating ? "0 4px" : 0,
              transition: "width 0.2s ease",
            }}
          />

          {/* Prefix 图标 */}
          {prefix && (
            <span
              className="flex items-center shrink-0 z-20 pl-3"
              style={{
                color: isFocused ? "#0054fe" : "#bfbfbf",
                transition: "color 0.2s ease",
              }}
            >
              {prefix}
            </span>
          )}

          {/* 输入框容器 */}
          <div className="relative flex-1 pl-3">
            {/* 浮动 Label */}
            <label
              className="absolute top-0 pointer-events-none whitespace-nowrap leading-none z-20 bg-white px-1"
              style={{
                left: 8,
                transform: isFloating
                  ? "translateY(-8px) scale(0.85)"
                  : "translateY(12px) scale(1)",
                transformOrigin: "left top",
                color: isFocused ? "#0054fe" : "#bfbfbf",
                transition: "transform 0.2s ease-out, color 0.2s ease",
              }}
            >
              {label}
            </label>

            {/* 密码输入框 */}
            <Input.Password
              {...rest}
              ref={ref}
              value={value}
              defaultValue={defaultValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="borderless"
              iconRender={visible =>
                visible ? (
                  <EyeTwoTone style={{ fontSize: 16 }} />
                ) : (
                  <EyeInvisibleOutlined style={{ fontSize: 16, color: "#bfbfbf" }} />
                )
              }
              className="bg-transparent border-none shadow-none outline-none text-base"
              style={{
                padding: "8px 12px 6px 0",
                ...rest.styles,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

MaterialPassword.displayName = "MaterialPassword";

// 组合导出
const MaterialInputWithPassword = MaterialInput as typeof MaterialInput & {
  Password: typeof MaterialPassword;
};
MaterialInputWithPassword.Password = MaterialPassword;

export default MaterialInputWithPassword;
