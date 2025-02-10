"use client";

import UpvoteButton from "@/app/components/elements/UpvoteButton";
import useLoginPopup from "@/app/hooks/useLoginPopup";
import { CommentWithUser } from "@/app/types/comment";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import CommentInput from "./CommentInput";
import Link from "next/link";
import { Chat, Share } from "react-bootstrap-icons";

interface PostDetailProps {
  post: PostWithUserAndSubbedit;
  addComment: (comment: CommentWithUser) => void;
}

const PostDetail: FC<PostDetailProps> = ({ post, addComment }) => {
  const [commentText, setCommentText] = useState("");
  const { data: session } = useSession();
  const { openLoginPopup } = useLoginPopup();
  const [isCommentTextAreaOpened, setCommentTextAreaOpened] =
    useState<boolean>(false);

  const handleCommentSubmit = async () => {
    if (!session) {
      openLoginPopup();
      return;
    }
    setCommentText("");

    const response = await fetch(
      `/api/subbedit/${post.Subbedit.name}/post/${post.id}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: commentText }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to submit comment");
    }

    const data = await response.json();
    addComment(data as CommentWithUser);

    setTimeout(() => {
      const newCommentElement = document.getElementById(`comment-${data.id}`);
      if (newCommentElement) {
        newCommentElement.scrollIntoView({ behavior: "smooth" });
        newCommentElement.style.backgroundColor = "#DDD";
        newCommentElement.style.borderRadius = "10px";
        newCommentElement.style.border = "1px red";
        setTimeout(() => {
          newCommentElement.style.backgroundColor = "";
        }, 3000);
      }
    }, 100);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <>
      <main className="container mx-auto flex">
        <div className="w-full">
          <div className="mb-4 rounded-lg bg-gray-800 p-4">
            <div className="flex gap-2">
              <div className="flex flex-col items-center gap-2">
                <Image
                  className="inline-block self-center rounded-full"
                  src={
                    post.User.profilePicUrl
                      ? post.User.profilePicUrl
                      : "https://i.pravatar.cc/40"
                  }
                  alt="Avatar"
                  width={40}
                  height={40}
                />
                <UpvoteButton post={post} />
              </div>
              <div className="flex-1">
                <div className="flex gap-2">
                  <div className="text-gray-400">
                    <Link href={`/b/${post.Subbedit.name}`}>
                      <span className="font-bold">b/{post.Subbedit.name}</span>{" "}
                      &middot; 3d ago
                    </Link>
                    <p className="-mt-1 text-sm">{post.User.username}</p>
                  </div>
                </div>
                <h1 className="mb-2 text-2xl font-semibold">{post.title}</h1>
                {post.mediaUrl && (
                  <Image
                    src={post.mediaUrl}
                    alt="Image Post"
                    width={600}
                    height={400}
                    className="mb-4 max-h-96 w-full rounded-lg object-cover"
                  />
                )}
                <p className="mb-4 text-sm">{post.body}</p>
                <div className="flex w-full items-center space-x-4 text-gray-400">
                  {isCommentTextAreaOpened ? (
                    <CommentInput
                      commentText={commentText}
                      handleTextChange={handleTextChange}
                      onCancel={() => setCommentTextAreaOpened(false)}
                      onSubmit={handleCommentSubmit}
                    />
                  ) : (
                    <div
                      className="flex cursor-pointer items-center space-x-1 rounded-lg p-1 duration-200 dark:hover:bg-gray-700"
                      onClick={() => setCommentTextAreaOpened(true)}
                    >
                      <Chat color="#9ca3af" size={16} />
                      <span className="text-sm">
                        {post.commentCount} Comments
                      </span>
                    </div>
                  )}
                  {/* <div className="flex cursor-pointer items-center space-x-1 rounded-lg p-1 duration-200 dark:hover:bg-gray-700">
                    <Share color="#9ca3af" size={16} />
                    <span className="text-sm">Share</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PostDetail;
