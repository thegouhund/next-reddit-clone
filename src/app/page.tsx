"use client"

import axios from "@configs/axios";
import { useEffect, useState } from "react";
import { SubbeditModel, PostModel } from "./types/model";
import Post from "./b/[subbeditName]/Post";

export default function Home() {
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/post/recent");
        console.log(response.data);
        setPosts(response.data);
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
          return (
            <Post post={post} key={post.id} withSubbedit />
          );
        })}
      </div>
    </div>
  );
}
