"use client";

import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import { PostWithUserAndSubbedit } from "@/app/types/post";

const Comment = ({
  params,
}: {
  params: { subbeditName: string; postId: number };
}) => {
  const [post, setPost] = useState<PostWithUserAndSubbedit>();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await (
        await fetch(`/api/subbedit/${params.subbeditName}/post/${params.postId}`)
      ).json();
      console.log(data);
      setPost(data);
      setComments(data.Comment);
    };

    fetchPost();
  }, [params.subbeditName, params.postId]);

  return (
    <div className="w-full">
      {post ? (
        <PostDetail post={post} comments={comments} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Comment;
