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
      <div className="flex gap-2">
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
        <div>
          <Link href={`/b/${post.Subbedit.name}`}>
            <span className="font-bold">b/{post.Subbedit.name}</span> &middot;
            3d ago
          </Link>
          <p className="-mt-1 text-sm">{post.User.username}</p>
        </div>
      </div>

      <h1 className="text-2xl font-extrabold">{post.title}</h1>
      {post.mediaUrl && (
        <Image
          src={post.mediaUrl}
          alt="Image Post"
          width={600}
          height={400}
          className="rounded-lg"
        />
      )}
      <ReactMarkdown className="prose min-w-full text-black prose-headings:m-0 prose-headings:p-0 prose-headings:underline prose-p:m-0 prose-a:text-blue-600 prose-blockquote:m-0 prose-ol:m-0 prose-ul:m-0 prose-li:m-0 prose-table:m-0 prose-img:m-0 prose-img:rounded-lg prose-hr:m-0">
        {post.body}
      </ReactMarkdown>
      <div className="flex items-center">
        <UpvoteButton post={post} />
      </div>
      {isCommentTextAreaOpened ? (
        <CommentInput
          commentText={commentText}
          handleTextChange={handleTextChange}
          onCancel={() => setCommentTextAreaOpened(false)}
          onSubmit={handleCommentSubmit}
        />
      ) : (
        <button
          onClick={() => setCommentTextAreaOpened(true)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-left text-gray-400"
        >
          Add a comment
        </button>
      )}
    </>
  );
};

export default PostDetail;
