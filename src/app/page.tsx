"use client";

import { useEffect, useState } from "react";
import Post from "./b/[subbeditName]/Post";
import { PostWithUserAndSubbedit } from "./types/post";

export default function Home() {
  const [posts, setPosts] = useState<PostWithUserAndSubbedit[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("api/post/recent");
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full">
      <h2>Most Recent Posts: </h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          return <Post post={post} key={post.id} withSubbedit />;
        })}
      </div>
    </div>
  );
}
