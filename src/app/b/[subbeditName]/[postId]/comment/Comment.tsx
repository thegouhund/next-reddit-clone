import useLoginPopup from "@/app/hooks/useLoginPopup";
import { CommentWithUser } from "@/app/types/comment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { Chat } from "react-bootstrap-icons";
import ReactMarkdown from "react-markdown";
import CommentInput from "./CommentInput";

interface CommentProps {
  comment: CommentWithUser;
  indentation: number;
  postId: number;
  addComment: (comment: CommentWithUser) => void;
}

const Comment: FC<CommentProps> = ({
  comment,
  indentation,
  postId,
  addComment,
}) => {
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const { data: session } = useSession();
  const { openLoginPopup } = useLoginPopup();

  const handleCommentSubmit = async () => {
    if (!session) {
      openLoginPopup();
      return;
    }
    const data = await (
      await fetch(`/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: commentText,
          postId: parseInt("" + postId, 36),
          parentCommentId: comment.id,
        }),
      })
    ).json();

    setCommentText("");
    setShowReplyBox(false);
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
    <div
      key={comment.id}
      id={`comment-${comment.id}`}
      className="relative mb-3 rounded transition-colors"
      style={{ marginLeft: `${indentation}px` }}
    >
      <div className="absolute bottom-0 top-0 w-[2px] bg-gray-300"></div>
      <div className="ml-2">
        <Link
          href={`/u/${comment.User.username}`}
          className="text-gray-600 hover:text-green-500"
        >
          u/{comment.User.username}
        </Link>
        <ReactMarkdown className="prose text-black">
          {comment.body}
        </ReactMarkdown>
        <button
          onClick={() => setShowReplyBox(true)}
          className="text-md mb-2 flex items-center gap-1.5 rounded px-1 py-1 transition-colors hover:bg-gray-300"
        >
          <Chat size={20} />
          Reply
        </button>
        {showReplyBox && (
          <CommentInput
            commentText={commentText}
            handleTextChange={handleTextChange}
            onCancel={() => setShowReplyBox(false)}
            onSubmit={handleCommentSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
