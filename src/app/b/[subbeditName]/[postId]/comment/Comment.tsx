import useLoginPopup from "@/app/hooks/useLoginPopup";
import { CommentWithUser } from "@/app/types/comment";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { Chat } from "react-bootstrap-icons";
import ReactMarkdown from "react-markdown";

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

  return (
    <div
      key={comment.id}
      id={`comment-${comment.id}`}
      className="relative mb-3 transition-colors rounded"
      style={{ marginLeft: `${indentation}px` }}
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-[2px] bg-gray-300"
        style={{ left: "-10px" }}
      ></div>
      <p>u/{comment.User.username}</p>
      <ReactMarkdown className="prose prose-gray prose-blue">
        {comment.body}
      </ReactMarkdown>
      <button
        onClick={() => setShowReplyBox(true)}
        className="text-md mb-2 flex items-center gap-1.5 rounded px-2 py-1 transition-colors hover:bg-gray-300"
      >
        <Chat size={20} />
        reply
      </button>
      {showReplyBox && (
        <>
          <div className="flex gap-4">
            <textarea
              className="w-full resize-y rounded-lg bg-slate-300 p-2"
              placeholder="Add a comment"
              name="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button className="" onClick={() => setShowReplyBox(false)}>
              Cancel
            </button>
            <button className="" onClick={() => handleCommentSubmit()}>
              Comment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
