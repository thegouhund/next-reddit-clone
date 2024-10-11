"use client";

import { PostModel } from "@/app/types/model";
import axios from "@configs/axios";
import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";

const Comment = ({
  params,
}: {
  params: { subbeditName: string; postId: number };
}) => {
  const [post, setPost] = useState<PostModel>();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `/subbedit/${params.subbeditName}/post/${params.postId}`,
      );
      console.log(response.data);
      setPost(response.data);
      setComments(response.data.Comment);
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
