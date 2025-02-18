import React from "react";

interface CommentInputProps {
  commentText: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  handleTextChange,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="w-full">
      <textarea
        className="w-full rounded-lg border border-gray-700 p-4 focus:outline-hidden dark:bg-inherit"
        placeholder="Add a comment"
        name="text"
        autoFocus
        value={commentText}
        onChange={handleTextChange}
      />
      <div className="flex justify-end gap-2">
        <button
          className="cursor-pointer rounded-lg bg-gray-700 px-2 py-1 text-sm text-white"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="cursor-pointer bg-accent cursor-pointer rounded-lg px-2 py-1 text-sm text-white"
          onClick={onSubmit}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
