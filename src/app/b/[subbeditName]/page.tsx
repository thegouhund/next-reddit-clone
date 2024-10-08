"use client";

import { PostModel } from "@/app/types/model";
import axios from "@configs/axios";
import useSidebar from "@hooks/useSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Post from "./Post";
import SidebarContent from "./SidebarContent";

function SubbeditPage({ params }: { params: { subbeditName: string } }) {
  const pathName = usePathname();
  const { setSidebar } = useSidebar();
  const [openedTab, setOpenedTab] = useState(0);
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/subbedit/${params.subbeditName}/post`);
      console.log(response.data);
      setPosts(response.data);
    };

    fetchPosts();
  }, [params.subbeditName]);

  useEffect(() => {
    setSidebar(<p>{params.subbeditName}</p>);

    return () => setSidebar(null);
  }, [setSidebar, params.subbeditName]);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl">b/{params.subbeditName}</h2>
          <Link href={pathName + "/new"}>
            <p className="rounded bg-blue-400 p-2 font-bold text-white transition-all hover:bg-blue-300">
              Create New Post
            </p>
          </Link>
        </div>
        <div className="mb-4 hidden gap-1 border-b-2 max-[900px]:flex">
          <button
            className={`cursor-pointer rounded-lg rounded-b-none border-l-2 border-r-2 border-t-2 px-2 text-lg transition-all ${openedTab === 0 ? "bg-slate-200" : "hover:bg-slate-200 hover:text-blue-500"}`}
            onClick={() => setOpenedTab(0)}
          >
            Posts
          </button>
          <button
            className={`cursor-pointer rounded-lg rounded-b-none border-l-2 border-r-2 border-t-2 px-2 text-lg transition-all ${openedTab === 1 ? "bg-slate-200" : "hover:bg-slate-200 hover:text-blue-500"}`}
            onClick={() => setOpenedTab(1)}
          >
            About
          </button>
        </div>

        {openedTab === 0 ? (
          <>
            <h3 className="text-2xl">Recent Posts: </h3>
            {posts.map((post, index) => {
              return <Post post={post} key={index} withUser />;
            })}
          </>
        ) : (
          <SidebarContent> </SidebarContent>
        )}
      </div>
    </>
  );
}

export default SubbeditPage;
