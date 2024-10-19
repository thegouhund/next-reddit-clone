import { PostWithUserAndSubbedit } from "@/app/types/post";
import { Vote as VoteType } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ArrowDownShort, ArrowUpShort } from "react-bootstrap-icons";

interface UpvoteButtonProps {
  post: PostWithUserAndSubbedit & { Vote: VoteType[] };
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({ post }) => {
  const [upvote, setUpvote] = useState<number>(0);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (post.Vote.some((v) => v.userId === parseInt(session?.user.id || "0"))) {
      setIsVoted(true);
    }
  }, [post.Vote, session?.user]);

  useEffect(() => {
    const fetchVoteCount = async () => {
      const data = await (
        await fetch(`/api/post/vote/${post.id}`)
      ).json();

      setUpvote(data.voteScore);
    };

    fetchVoteCount();
  }, [post.id, isVoted]);

  const handleUpvote = async () => {
    if (isVoted) {
      const data = await (
        await fetch(`/api/post/vote/${post.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId: post.id }),
        })
      ).json();

      console.log(data);
      // setUpvote(upvote - 1);
      setIsVoted(false);
      return;
    }

    const data = await (
      await fetch(`/api/post/vote/${post.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id, isUpvote: true }),
      })
    ).json();

    console.log(data);
    // setUpvote(upvote + 1);
    setIsVoted(true);
  };

  const handleDownvote = async () => {
    if (isVoted) {
      const data = await (
        await fetch(`/api/post/vote/${post.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId: post.id }),
        })
      ).json();

      console.log(data);
      // setUpvote(upvote + 1);
      setIsVoted(false);
      return;
    }

    const data = await (
      await fetch(`/api/post/vote/${post.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id, isUpvote: false }),
      })
    ).json();

    console.log(data);
    // setUpvote(upvote - 1);
    setIsVoted(true);
    return;
  };

  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-200 p-1 hover:bg-gray-300">
      <button
        onClick={handleUpvote}
        className="rounded-lg border border-transparent hover:border-gray-400"
      >
        <ArrowUpShort size={20} />
      </button>
      <p>{upvote}</p>
      <button
        onClick={handleDownvote}
        className="rounded-lg border border-transparent hover:border-gray-400"
      >
        <ArrowDownShort size={20} />
      </button>
    </div>
  );
};

export default UpvoteButton;
