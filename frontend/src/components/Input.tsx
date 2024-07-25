import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  errorMessage?: string;
  errorPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  tooltip?: string;
}

const Input = ({
  id,
  type = "text",
  label,
  errorMessage,
  errorPosition = "top-right",
  tooltip,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType: HTMLInputTypeAttribute = showPassword ? "text" : type;
  const inputName = rest.name;
  return (
    <div className="w-full">
      <div className="sm:col-span-3">
        {label && (
          <label
            htmlFor={id}
            className="mb-1 flex justify-between uppercase text-xs tracking-wide font-medium leading-6 text-gray-900"
          >
            <div className="flex items-center gap-2">{label}</div>
          </label>
        )}
        <div className="relative mt-2 flex items-center rounded-md shadow-sm">
          <input
            {...rest}
            type={inputType}
            id={id ?? inputName}
            name={inputName}
            autoComplete={inputName}
            className={classNames(
              "rounded-md block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6",
              {
                "ring-red-500": errorMessage,
              }
            )}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 group flex items-center justify-center min-w-[2.5rem]"
              onClick={(e) => {
                e.stopPropagation();
                setShowPassword((prevShowPassword) => !prevShowPassword);
              }}
            >
              {!showPassword && (
                <EyeSlashIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              )}
              {showPassword && (
                <EyeIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
