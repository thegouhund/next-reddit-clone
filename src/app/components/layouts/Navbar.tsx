"use client";

import useLoginPopup from "@hooks/useLoginPopup";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { BoxArrowInRight } from "react-bootstrap-icons";
import Dropdown from "./Dropdown";

export const Navbar = () => {
  const { openLoginPopup } = useLoginPopup();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-14 w-full items-center justify-between border-b border-gray-400 px-8">
      <h2 className="text-4xl text-blue-600">
        <Link href="/">Beddit</Link>
      </h2>
      {session ? (
        <div className="relative">
          <div
            className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-sm text-gray-600">
              {session.user.username}
            </span>
            <Image
              className="rounded-full object-cover"
              src={session.user.image || "https://i.pravatar.cc/300"}
              alt={session.user.username}
              width={30}
              height={30}
            />
          </div>
          <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}></Dropdown>
        </div>
      ) : (
        <button
          onClick={() => openLoginPopup() }
          className="flex cursor-pointer items-center gap-2 rounded p-2 text-gray-600 transition-all hover:bg-gray-200 hover:text-black"
        >
          Log In
          <BoxArrowInRight size={18}></BoxArrowInRight>
        </button>
      )}
    </div>
  );
};
