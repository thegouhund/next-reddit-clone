import { CommentWithUser } from "@/app/types/comment";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import { Vote as VoteType } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import { ArrowDownShort, ArrowUpShort } from "react-bootstrap-icons";

interface UpvoteButtonProps {
  post?: PostWithUserAndSubbedit & { Vote: VoteType[] };
  comment?: CommentWithUser & { Vote: VoteType[] };
  variant: "ghost" | "normal";
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({
  post,
  comment,
  variant = "normal",
}) => {
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
    [comment?.id, voteState, post],
  );

  return (
    <div
      className={`${variant === "ghost" ? "bg-transparent" : "bg-gray-200"} flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-gray-300`}
    >
      <button
        onClick={() => handleVote(true)}
        className={`${voteState.isUpvoted ? "text-blue-500" : ""} rounded-lg border border-transparent hover:border-gray-400 hover:text-blue-500`}
      >
        <ArrowUpShort size={20} />
      </button>
      <p>{voteState.upvote}</p>
      <button
        onClick={() => handleVote(false)}
        className={`${voteState.isDownvoted ? "text-red-500" : ""} rounded-lg border border-transparent p-0 hover:border-gray-400 hover:text-red-500`}
      >
        <ArrowDownShort size={20} />
      </button>
    </div>
  );
};

export default UpvoteButton;
