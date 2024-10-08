import { CommentModel } from "@/app/types/model";
import axios from "@configs/axios";
import React, { FC, useState } from "react";
import ReactMarkdown from "react-markdown";

interface CommentProps {
  comment: CommentModel;
  indentation: number;
  postId: number;
}

const Comment: FC<CommentProps> = ({ comment, indentation, postId }) => {
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  const handleCommentSubmit = async () => {
    const response = await axios.post(`/post`, {
      body: commentText,
      postId: postId,
      parentCommentId: comment.id,
    });
    console.log(response.data);
    setCommentText("");
    setShowReplyBox(false);

    window.location.reload();
  };

  return (
    <div
      key={comment.id}
      className="mb-1"
      style={{ marginLeft: `${indentation}px` }}
    >
      <p>u/{comment.User.username}</p>
      <ReactMarkdown className="prose prose-gray prose-blue">
        {comment.body}
      </ReactMarkdown>
      <button onClick={() => setShowReplyBox(true)} className="bg-gray-300">
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
