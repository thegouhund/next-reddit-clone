"use client";

import JoinSubbeditButton from "@/app/components/elements/JoinSubbeditButton";
import Skeleton from "@/app/components/elements/Skeleton";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Plus, ThreeDots } from "react-bootstrap-icons";
import Post from "./Post";

type Params = Promise<{ subbeditName: string }>;

function SubbeditPage({ params }: { params: Params }) {
  const { subbeditName } = use(params);
  const pathName = usePathname();
  const [openedTab, setOpenedTab] = useState(0);
  const { data: session } = useSession();
  const [isJoined, setIsJoined] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      const joined = session.user.subbedits.some(
        (subbedit) => subbedit.name === subbeditName,
      );
      setIsJoined(joined);
    }
  }, [subbeditName, session]);

  const { data: posts, isLoading } = useQuery<PostWithUserAndSubbedit[]>({
    queryFn: () =>
      fetch(`/api/subbedit/${subbeditName}/post`).then((res) => res.json()),
    queryKey: ["posts"],
  });

  if (isLoading) {
    return (
      <div className="w-full space-y-4 lg:w-2/3">
        <h2 className="text-3xl">b/{subbeditName}</h2>
        <h3 className="text-2xl">Recent Posts: </h3>
        <div className="w-full">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="mb-4 flex flex-col gap-2 rounded-lg bg-gray-800 p-4"
          >
            <Skeleton width={80} />
            <Skeleton />
            <Skeleton width="80%" />
            <Skeleton height={400} width="50%" />
          </div>
        ))}
      </div>
        </div>
    );
  }

  return (
    <>
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl">b/{subbeditName}</h2>
          {isJoined ? (
            <div className="flex items-center gap-4">
              <Link href={pathName + "/new"}>
                <button className="rounded bg-blue-400 p-2 font-bold text-white transition-all hover:bg-blue-300">
                  <div className="flex items-center gap-1">
                    <Plus color="white" size={24} />
                    Create New Post
                  </div>
                </button>
              </Link>
              <Link
                href={pathName + "/setting"}
                className="rounded bg-blue-400 p-2 font-bold text-white transition-all hover:bg-blue-300"
              >
                <ThreeDots color="white" size={24} />
              </Link>
            </div>
          ) : (
            <JoinSubbeditButton
              subbeditName={subbeditName}
              onJoined={() => setIsJoined(true)}
            />
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
            {posts?.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              posts?.map((post: PostWithUserAndSubbedit, index: number) => (
                <Post post={post} key={index} inSubbedit />
              ))
            )}
          </>
        ) : null}
      </div>
    </>
  );
}

export default SubbeditPage;
