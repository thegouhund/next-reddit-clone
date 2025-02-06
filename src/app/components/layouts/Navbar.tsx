// "use client";

// import useLoginPopup from "@hooks/useLoginPopup";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";

// import { useState } from "react";
// import { BoxArrowInRight } from "react-bootstrap-icons";
// import Dropdown from "./Dropdown";

// export const Navbar = () => {
//   const { openLoginPopup } = useLoginPopup();
//   const { data: session } = useSession();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="flex h-14 w-full items-center justify-between border-b border-gray-400 px-8">
//       <h2 className="text-4xl text-blue-600">
//         <Link href="/">Beddit</Link>
//       </h2>
//       {session ? (
//         <div className="relative">
//           <div
//             className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-200"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <span className="text-sm text-gray-600">
//               {session.user.username}
//             </span>
//             <Image
//               className="rounded-full object-cover"
//               src={session.user.image || "https://i.pravatar.cc/300"}
//               alt={session.user.username}
//               width={30}
//               height={30}
//             />
//           </div>
//           <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}></Dropdown>
//         </div>
//       ) : (
//         <button
//           onClick={() => openLoginPopup() }
//           className="flex cursor-pointer items-center gap-2 rounded p-2 text-gray-600 transition-all hover:bg-gray-200 hover:text-black"
//         >
//           Log In
//           <BoxArrowInRight size={18}></BoxArrowInRight>
//         </button>
//       )}
//     </div>
//   );
// };
"use client";
import useLoginPopup from "@/app/hooks/useLoginPopup";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  BoxArrowInRight,
  Chat,
  Moon,
  Search,
} from "react-bootstrap-icons";
import Dropdown from "./Dropdown";

export const Navbar = () => {
  const { openLoginPopup } = useLoginPopup();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 py-2 text-white">
      <div className="mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href={"/"} className="text-2xl font-bold">
            beddit
          </Link>
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search Reddit"
              className="w-64 rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              color="white"
              size={20}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Moon className="cursor-pointer" color="white" size={20} />
          <Bell className="cursor-pointer" color="white" size={20} />
          <Chat className="cursor-pointer" color="white" size={20} />
          {session ? (
            <div className="relative">
              <div
                className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-sm text-gray-200">
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
              onClick={() => openLoginPopup()}
              className="flex cursor-pointer items-center gap-2 rounded p-2 text-gray-600 transition-all hover:bg-gray-200 hover:text-black dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Log In
              <BoxArrowInRight color="white" size={18}></BoxArrowInRight>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
