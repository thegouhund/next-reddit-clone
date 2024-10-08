"use client";

import useLoginPopup from "@hooks/useLoginPopup";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { BoxArrowInLeft, BoxArrowInRight, Gear } from "react-bootstrap-icons";

export const Navbar = () => {
  const { setShowLoginPopup } = useLoginPopup();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex h-14 w-full items-center justify-between border-b border-gray-400 px-8">
      <h2 className="text-4xl text-blue-600">
        <Link href="/">Beddit</Link>
      </h2>
      {session ? (
        <div className="relative">
          <div
            className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-200"
            onClick={() => setDropdownOpen(!dropdownOpen)}
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
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded border border-gray-200 bg-white shadow-lg">
              <button
                onClick={() => setDropdownOpen(false)}
                className="flex w-full items-center gap-1 px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
              >
                <Gear />
                Settings
              </button>
              <button
                onClick={() => {
                  signOut();
                  setDropdownOpen(false);
                }}
                className="flex w-full items-center gap-1 px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
              >
                <BoxArrowInLeft />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setShowLoginPopup(true)}
          className="flex cursor-pointer items-center gap-2 rounded p-2 text-gray-600 transition-all hover:bg-gray-200 hover:text-black"
        >
          Log In
          <BoxArrowInRight size={18}></BoxArrowInRight>
        </button>
      )}
    </div>
  );
};
