"use client";

import useLoginPopup from "@/app/hooks/useLoginPopup";
import { CommentWithUser } from "@/app/types/comment";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import postImg from "@public/post-img-example.png";
import debounce from "lodash.debounce";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FC, useMemo, useState } from "react";

interface PostDetailProps {
  post: PostWithUserAndSubbedit;
  addComment: (comment: CommentWithUser) => void;
}

const PostDetail: FC<PostDetailProps> = ({ post, addComment }): JSX.Element => {
  const [commentText, setCommentText] = useState("");
  const { data: session } = useSession();
  const { openLoginPopup } = useLoginPopup();

  const handleCommentSubmit = async () => {
    if (!session) {
      openLoginPopup();
      return;
    }
    setCommentText("");

    const data = await (
      await fetch(
        `/api/subbedit/${post.Subbedit.name}/post/${post.id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: commentText }),
        },
      )
    ).json();

    addComment(data as CommentWithUser);

    setTimeout(() => {
      const newCommentElement = document.getElementById(`comment-${data.id}`);
      if (newCommentElement) {
        newCommentElement.scrollIntoView({ behavior: "smooth" });
        newCommentElement.style.backgroundColor = "#DDD";
        setTimeout(() => {
          newCommentElement.style.backgroundColor = "";
        }, 3000);
      }
    }, 100);
  };

  const debouncedSetCommentText = useMemo(() => debounce(setCommentText), []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debouncedSetCommentText(e.target.value);
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold">{post.title}</h1>
      <Image
        src={postImg}
        alt="Image Post"
        width={600}
        className="rounded-lg"
        priority
      />
      <h3 className="text-base font-medium">{post.body}</h3>

      <div className="flex gap-4">
        <textarea
          className="w-full rounded-lg bg-slate-300 p-4"
          placeholder="Add a comment"
          name="text"
          value={commentText}
          onChange={handleTextChange}
        />
        <button className="" onClick={handleCommentSubmit}>
          Comment
        </button>
      </div>
    </>
  );
};

export default PostDetail;
