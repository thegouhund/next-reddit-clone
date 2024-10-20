import { PostWithUserAndSubbedit } from "@/app/types/post";
import { Vote as VoteType } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import { ArrowDownShort, ArrowUpShort } from "react-bootstrap-icons";

interface UpvoteButtonProps {
  post: PostWithUserAndSubbedit & { Vote: VoteType[] };
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({ post }) => {
  const [voteState, setVoteState] = useState({
    upvote: post.Vote.reduce(
      (total, vote) => total + (vote.isUpvote ? 1 : -1),
      0,
    ),
    isUpvoted: false,
    isDownvoted: false,
  });
  const { data: session } = useSession();

  useEffect(() => {
    const userVote = post.Vote.find(
      (v) => v.userId === parseInt(session?.user.id || "0"),
    );
    if (userVote) {
      setVoteState((prev) => ({
        ...prev,
        isUpvoted: userVote.isUpvote,
        isDownvoted: !userVote.isUpvote,
      }));
    }
  }, [post.Vote, session?.user]);

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

      const response = await fetch(`/api/post/vote/${post.id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post.id,
          isUpvote: !currentVote && isUpvote,
        }),
      });

      if (response.ok) {
        setVoteState((prev) => ({
          upvote: prev.upvote + voteChange,
          isUpvoted: !currentVote && isUpvote,
          isDownvoted: !currentVote && !isUpvote,
        }));
      }
    },
    [post.id, voteState],
  );

  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-200 p-1 hover:bg-gray-300">
      <button
        onClick={() => handleVote(true)}
        className={`${voteState.isUpvoted ? "text-blue-500" : ""} rounded-lg border border-transparent hover:border-gray-400`}
      >
        <ArrowUpShort size={20} />
      </button>
      <p>{voteState.upvote}</p>
      <button
        onClick={() => handleVote(false)}
        className={`${voteState.isDownvoted ? "text-red-500" : ""} rounded-lg border border-transparent hover:border-gray-400`}
      >
        <ArrowDownShort size={20} />
      </button>
    </div>
  );
};

export default UpvoteButton;
