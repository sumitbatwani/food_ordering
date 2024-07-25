import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React from "react";
import ReactModal from "react-modal";

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  removeClose?: boolean;
  onRequestClose: () => void;
  isOpen: boolean;
  noTransition?: boolean;
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  disableScroll?: boolean;
  background?:
    | "bg-white"
    | "bg-athens-gray"
    | "bg-gray-100"
    | "bg-gray-50"
    | "bg-transparent";
  style?: React.CSSProperties;
};

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  containerClassName,
  removeClose = false,
  onRequestClose,
  noTransition,
  width = 400,
  maxWidth = 800,
  minWidth = 400,
  disableScroll,
  background = "bg-white",
  style,
  ...props
}) => {
  return (
    <ReactModal
      style={{
        content: {
          width,
          maxWidth,
          minWidth,
          ...style,
        },
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: "auto",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9000,
        },
      }}
      overlayClassName={classNames("ReactModal__Overlay", {
        ReactModal__Overlay__Transition: !noTransition,
      })}
      className={classNames(
        "max-h-full overflow-auto outline-none",
        disableScroll ? "overflow-hidden" : "overflow-auto",
        containerClassName
      )}
      onRequestClose={(e) => {
        e.stopPropagation();
        onRequestClose();
      }}
      aria-modal="true"
      {...props}
    >
      <div
        className={classNames(
          `flex flex-col justify-center ${background} rounded-md relative`,
          className
        )}
      >
        {children}
        {!removeClose && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRequestClose();
            }}
            className="absolute top-4 right-4 w-6 h-6 text-gray-400 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
            aria-label="Close"
          >
            <XMarkIcon className="w-4" />
          </button>
        )}
      </div>
    </ReactModal>
  );
};

export default Modal;
