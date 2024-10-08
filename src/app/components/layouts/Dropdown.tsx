import { signOut } from "next-auth/react";
import React, { Dispatch, SetStateAction } from "react";
import { BoxArrowInLeft, Gear } from "react-bootstrap-icons";

const Dropdown = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`transition-max-height absolute right-0 mt-2 w-48 overflow-hidden rounded border border-gray-200 bg-white shadow-lg duration-300 ${
        isOpen ? "max-h-40" : "max-h-0 border-none"
      }`}
    >
      <button
        onClick={() => setIsOpen(false)}
        className="flex w-full items-center gap-1 px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
      >
        <Gear />
        Settings
      </button>
      <hr />
      <button
        onClick={() => {
          signOut();
          setIsOpen(false);
        }}
        className="flex w-full items-center gap-1 px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
      >
        <BoxArrowInLeft />
        Logout
      </button>
    </div>
  );
};

export default Dropdown;
