"use client";

import { PostWithUserAndSubbedit } from "@/app/types/post";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, ThreeDots } from "react-bootstrap-icons";
import Post from "./Post";

function SubbeditPage({ params }: { params: { subbeditName: string } }) {
  const pathName = usePathname();
  const [openedTab, setOpenedTab] = useState(0);
  const [posts, setPosts] = useState<PostWithUserAndSubbedit[]>([]);
  const [isJoined, setIsJoined] = useState<boolean>(true);

  const { data: session } = useSession();

  const handleJoinSubbedit = async () => {
    const data = await (
      await fetch(`/api/subbedit/${params.subbeditName}/join`, {
        method: "POST",
      })
    ).json();

    console.log(data);
    if (data) {
      setIsJoined(true);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await (
        await fetch(`/api/subbedit/${params.subbeditName}/post`)
      ).json();
      console.log(data);
      setPosts(data);
    };

    fetchPosts();
  }, [params.subbeditName, session]);

  useEffect(() => {
    if (session) {
      const joined = session.user.subbedits.some(
        (subbedit) => subbedit.name === params.subbeditName,
      );
      setIsJoined(joined);
    }
  }, [params.subbeditName, session]);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl">b/{params.subbeditName}</h2>
          {isJoined ? (
            <div className="flex items-center gap-4">
              <Link href={pathName + "/new"}>
                <button className="rounded bg-blue-400 p-2 font-bold text-white transition-all hover:bg-blue-300">
                  <div className="flex items-center gap-1">
                    <Plus size={24} />
                    Create New Post
                  </div>
                </button>
              </Link>
              <button className="rounded bg-blue-400 p-2 font-bold text-white transition-all hover:bg-blue-300">
                <ThreeDots color="white" size={24} />
              </button>
            </div>
          ) : (
            <button onClick={handleJoinSubbedit}>
              <p className="rounded bg-blue-400 p-2 font-bold text-white transition-all hover:bg-blue-300">
                + Join
              </p>
            </button>
          )}
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
            {posts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              posts.map((post: PostWithUserAndSubbedit, index: number) => (
                <Post post={post} key={index} withUser />
              ))
            )}
          </>
        ) : null}
      </div>
    </>
  );
}

export default SubbeditPage;
