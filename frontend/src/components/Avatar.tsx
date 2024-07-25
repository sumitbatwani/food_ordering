import cn from "classnames";
import React from "react";
import ReactAvatar, { ReactAvatarProps } from "react-avatar";

const Avatar: React.FC<ReactAvatarProps> = ({
  src,
  size = "80",
  className,
  ...props
}) => {
  const convertedSize = isNaN(size as any) ? size : parseInt(size as any, 10);

  if (!src) {
    return (
      <div
        className={cn(
          "bg-gray-400 rounded-full flex items-center justify-center",
          className
        )}
        style={{
          width: convertedSize,
          height: convertedSize,
          maxHeight: convertedSize,
          maxWidth: convertedSize,
          minHeight: convertedSize,
          minWidth: convertedSize,
        }}
      >
        <span className="inline-block overflow-hidden rounded-full bg-gray-100 border-2 border-gray-300">
          <svg
            className="h-full w-full text-gray-300"
            fill="#6b7280"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </div>
    );
  }
  return (
    <ReactAvatar
      src={src}
      size={size}
      className={className}
      round
      {...props}
    />
  );
};

export default Avatar;
