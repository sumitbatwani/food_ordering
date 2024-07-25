import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";

interface DropdownProps {
  button: any;
  position?: "left" | "right";
  menuHeader?: any;
  menuItems: { key: string; label: string; icon?: any }[];
  onClick: (key: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  button,
  position = "right",
  menuHeader,
  menuItems,
  onClick,
}) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <Menu.Button>{button}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "absolute z-10 mt-2 w-max origin-top-right rounded-md",
            "bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            { "right-0": position === "right" },
            { "left-0": position === "left" }
          )}
        >
          {menuHeader}
          <div className="py-1">
            {menuItems.map((item: any) => (
              <Menu.Item key={item.key}>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick(item.key);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "w-full px-4 py-3 flex items-start justify-between"
                    )}
                  >
                    {item.label}
                    {item.icon && (
                      <span className="ml-2 flex-shrink-0">{item.icon}</span>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
