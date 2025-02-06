import useLoginPopup from "@/app/hooks/useLoginPopup";
import { CommentWithUser } from "@/app/types/comment";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowDownShort,
  ArrowUpShort,
  CaretDownFill,
  CaretUpFill,
} from "react-bootstrap-icons";

interface UpvoteButtonProps {
  post?: PostWithUserAndSubbedit;
  comment?: CommentWithUser;
  variant?: "ghost" | "normal";
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({
  post,
  comment,
  variant = "normal",
}) => {
  const { openLoginPopup } = useLoginPopup();
  const [voteState, setVoteState] = useState({
    upvote: (post?.Vote ?? comment?.Vote ?? []).reduce(
      (total, vote) => total + (vote.isUpvote ? 1 : -1),
      0,
    ),
    isUpvoted: false,
    isDownvoted: false,
  });
  const { data: session } = useSession();

  useEffect(() => {
    const userVote = (post?.Vote ?? comment?.Vote ?? []).find(
      (v) => v.userId === parseInt(session?.user.id || "0"),
    );
    if (userVote) {
      setVoteState((prev) => ({
        ...prev,
        isUpvoted: userVote.isUpvote,
        isDownvoted: !userVote.isUpvote,
      }));
    }
  }, [post?.Vote, comment?.Vote, session?.user]);

  const handleVote = useCallback(
    async (isUpvote: boolean) => {
      if (!session) return openLoginPopup();

      const { isUpvoted, isDownvoted } = voteState;
      const currentVote = isUpvote ? isUpvoted : isDownvoted;

      const method = currentVote ? "DELETE" : "POST";
      let voteChange;
      if (currentVote) {
        voteChange = isUpvote ? -1 : 1;
      } else {
        voteChange = isUpvote ? (isDownvoted ? 2 : 1) : isUpvoted ? -2 : -1;
      }

      const endpoint = post
        ? `/api/post/vote/${post.id}`
        : `/api/comment/vote/${comment?.id}`;

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post?.id,
          commentId: comment?.id,
          isUpvote: !currentVote && isUpvote,
        }),
      });

      if (response.ok) {
        setVoteState((prev) => ({
          upvote: (prev.upvote ?? 0) + voteChange,
          isUpvoted: !currentVote && isUpvote,
          isDownvoted: !currentVote && !isUpvote,
        }));
      }
    },
    [session, openLoginPopup, voteState, post, comment?.id],
  );

  return (
    // <div
    //   className={`${variant === "ghost" ? "bg-transparent" : "bg-gray-200"} flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-gray-300`}
    // >
    //   <button
    //     onClick={() => handleVote(true)}
    //     className={`rounded-lg border border-transparent hover:border-gray-400 hover:text-blue-500`}
    //   >
    //     <ArrowUpShort
    //       color={voteState.isUpvoted ? "#3b82f6" : "black"}
    //       size={20}
    //     />
    //   </button>
    //   <p>{voteState.upvote}</p>
    //   <button
    //     onClick={() => handleVote(false)}
    //     className={`rounded-lg border border-transparent p-0 hover:border-gray-400 hover:text-red-500`}
    //   >
    //     <ArrowDownShort
    //       color={voteState.isDownvoted ? "#ef4444" : "black"}
    //       size={20}
    //     />
    //   </button>
    // </div>
    <div className="flex flex-col items-center justify-center">
      <CaretUpFill
        className="cursor-pointer text-gray-400 hover:text-blue-500"
        color={voteState.isUpvoted ? "green" : "white"}
        size={20}
        onClick={() => handleVote(true)}
      />
      <span className="my-1 text-sm font-bold">{voteState.upvote}</span>
      <CaretDownFill
        className="cursor-pointer text-gray-400 hover:text-red-500"
        color={voteState.isDownvoted ? "#ef4444" : "white"}
        size={20}
        onClick={() => handleVote(false)}
      />
    </div>
  );
};

export default UpvoteButton;
