"use client";

import { CommentModel, PostModel } from "@/app/types/model";
import React, { FC, useState, useCallback, useMemo } from "react";
import axios from "@configs/axios";
import Comment from "./Comment";
import postImg from "@public/post-img-example.png";
import Image from "next/image";
import debounce from "lodash.debounce";

interface PostDetailProps {
  post: PostModel;
  comments: CommentModel[];
}

const PostDetail: FC<PostDetailProps> = ({ post, comments }): JSX.Element => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = async () => {
    await axios.post(
      `/subbedit/${post.Subbedit.name}/post/${post.id}/comment`,
      {
        body: commentText,
      },
    );
    setCommentText("");

    window.location.reload();
  };

  const debouncedSetCommentText = useMemo(() => debounce(setCommentText), []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debouncedSetCommentText(e.target.value);
  };

  const renderComments = useCallback(
    (
      comments: CommentModel[],
      parentId: number | null = null,
      indentation: number = 0,
    ) => {
      return comments
        .filter((comment) => comment.parentCommentId === parentId)
        .map((comment) => (
          <div key={comment.id}>
            <Comment
              comment={comment}
              indentation={indentation}
              postId={post.id}
            />
            {renderComments(comments, comment.id, indentation + 20)}
          </div>
        ));
    },
    [post.id],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-extrabold">{post.title}</h1>
      <Image
        src={postImg}
        alt="Image Post"
        width={600}
        className="rounded-lg"
      />
      <h3 className="text-base font-medium">{post.body}</h3>

      <div className="flex gap-4">
        <textarea
          className="w-full rounded-lg bg-slate-300 p-4"
          placeholder="Add a comment"
          name="text"
          onChange={handleTextChange}
        />
        <button className="" onClick={handleCommentSubmit}>
          Comment
        </button>
      </div>
      <div className="flex flex-col gap-1">{renderComments(comments)}</div>
    </div>
  );
};

export default PostDetail;
