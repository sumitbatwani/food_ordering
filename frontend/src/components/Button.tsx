import classNames from "classnames";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

type ButtonProps = {
  id?: string;
  type?: "button" | "submit" | "reset";
  size?: "md" | "block";
  variant?:
    | "default"
    | "disabled"
    | "primary"
    | "secondary"
    | "danger"
    | "transparent"
    | "transparent-primary"
    | "icon";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: any;
  children: any;
};
const Button: React.FC<ButtonProps> = ({
  id,
  type = "button",
  size = "md",
  variant,
  className,
  loading,
  disabled,
  onClick,
  children,
  ...rest
}) => {
  if (variant === "icon") {
    return (
      <button
        {...rest}
        onClick={onClick}
        className={classNames(
          "p-1.5 border-0 rounded hover:bg-gray-100 flex items-center justify-center text-gray-500",
          className
        )}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      {...rest}
      id={id ?? "button"}
      type={type}
      className={classNames(
        "rounded text-sm",
        { "text-sm block w-full": size === "block" },
        {
          "bg-gray-300 text-gray-600 border-0 cursor-not-allowed":
            variant === "disabled",
        },
        {
          "text-gray-600 hover:border-gray-200 hover:bg-gray-50":
            variant === "default",
        },
        {
          "bg-primary text-white border-0 hover:bg-primary/90":
            variant === "primary",
        },
        {
          "bg-red-600 text-white border-0 hover:bg-red-600/90":
            variant === "danger",
        },
        {
          "text-gray-600 bg-transparent p-0 hover:text-gray-800":
            variant === "transparent",
        },
        {
          "text-primary bg-transparent p-0 hover:text-primary/90":
            variant === "transparent-primary",
        },
        {
          "border p-2":
            variant !== "transparent" && variant !== "transparent-primary",
        },
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
