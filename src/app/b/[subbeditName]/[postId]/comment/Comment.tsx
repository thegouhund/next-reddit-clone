import UpvoteButton from "@/app/components/elements/UpvoteButton";
import useLoginPopup from "@/app/hooks/useLoginPopup";
import { CommentWithUser } from "@/app/types/comment";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { Person, Reply } from "react-bootstrap-icons";
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
  const isSessionAuthor: boolean = comment.User.id === parseInt(session?.user.id as string);

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
        newCommentElement.style.backgroundColor = "#6d727a";
        newCommentElement.style.borderRadius = "8px";
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
      className="mb-4"
      style={{ marginLeft: `${indentation}px` }}
    >
      <div className="border-l border-gray-100 pl-4"></div>
      {/* <div className="absolute bottom-0 top-0 w-[2px] bg-gray-300"></div>
      <div className="ml-2">
        <div className="flex items-start gap-2">
          <Image
            className="inline-block rounded-full"
            src={
              comment.User.profilePicUrl
                ? comment.User.profilePicUrl
                : "https://i.pravatar.cc/40"
            }
            alt="Avatar"
            width={30}
            height={30}
          />
          <div className="w-full">
            <p>
              <Link
                href={`/u/${comment.User.username}`}
                className="text-gray-600 hover:text-green-500"
              >
                u/{comment.User.username}
              </Link>
              <span className="text-gray-600"> &middot; 8h ago</span>
            </p>
            <ReactMarkdown className="prose text-black">
              {comment.body}
            </ReactMarkdown>
            <div className="flex items-center gap-2">
              <UpvoteButton comment={comment} variant="ghost" />
              <button
                onClick={() => setShowReplyBox(true)}
                className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-gray-300"
              >
                <Chat size={18} />
                Reply
              </button>
            </div>
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
      </div> */}

      <div className="flex gap-4">
        <UpvoteButton comment={comment} />
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-1 text-sm text-gray-400">
            {isSessionAuthor && <Person color="green" size={14} />}
            {comment.User.username} • 5 mins ago
          </div>
          <p className="mb-2 text-sm">{comment.body}</p>
          <div className="mb-2 flex items-center space-x-4 text-gray-400">
            <div
              className="flex cursor-pointer items-center space-x-1"
              onClick={() => setShowReplyBox(true)}
            >
              <Reply color="#9ca3af" size={14} />
              <span className="text-xs">Reply</span>
            </div>
          </div>
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
    </div>
  );
};

export default Comment;
