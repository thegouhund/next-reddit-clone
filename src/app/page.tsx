"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "./b/[subbeditName]/Post";
import Skeleton from "./components/elements/Skeleton";
import { PostWithUserAndSubbedit } from "./types/post";

export default function Home() {
  const { data: posts, isLoading } = useQuery<PostWithUserAndSubbedit[]>({
    queryFn: () => fetch("api/post/recent").then((res) => res.json()),
    queryKey: ["recentPosts"],
  });

  if (isLoading) {
    return (
      <div className="w-full">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="mb-4 flex flex-col gap-2 rounded border border-gray-400 p-4"
          >
            <Skeleton width={80} />
            <Skeleton />
            <Skeleton width="80%" />
            <Skeleton height={400} width="50%" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      {posts?.map((post) => {
        return <Post post={post} key={post.id} withSubbedit />;
      })}
    </div>
  );
}
