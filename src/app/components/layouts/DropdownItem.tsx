import React from "react";

interface DropdownItemProps {
  onClick: () => void;
  text: string;
  icon?: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ onClick, text, icon }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-1 px-4 py-2 text-left text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {icon}
      {text}
    </button>
  );
};

export default DropdownItem;
