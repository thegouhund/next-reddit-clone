import { signOut } from "next-auth/react";
import React, { Dispatch, SetStateAction } from "react";
import { BoxArrowInLeft, Gear } from "react-bootstrap-icons";
import DropdownItem from "./DropdownItem";

const Dropdown = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`transition-max-height absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded border border-gray-200 bg-white shadow-lg drop-shadow-lg duration-300 dark:border-gray-800 dark:bg-secondary dark:text-white ${
        isOpen ? "max-h-40" : "max-h-0 border-none"
      }`}
    >
      <DropdownItem
        onClick={() => setIsOpen(false)}
        text="Settings"
        icon={<Gear size={20} color="#9ca3af" />}
      />
      <DropdownItem
        onClick={() => {
          signOut();
          setIsOpen(false);
        }}
        text="Logout"
        icon={<BoxArrowInLeft size={20} color="#9ca3af" />}
      ></DropdownItem>
    </div>
  );
};

export default Dropdown;
