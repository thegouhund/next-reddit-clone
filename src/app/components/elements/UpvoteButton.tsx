import { PostWithUserAndSubbedit } from "@/app/types/post";
import { Vote as VoteType } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ArrowDownShort, ArrowUpShort } from "react-bootstrap-icons";

interface UpvoteButtonProps {
  post: PostWithUserAndSubbedit & { Vote: VoteType[] };
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({ post }) => {
  const [upvote, setUpvote] = useState<number>(
    post.Vote.reduce(
      (total, vote) => (vote.isUpvote ? total + 1 : total - 1),
      0,
    ),
  );
  const [isDownvoted, setIsDownvoted] = useState<boolean>(false);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const userVote = post.Vote.find(
      (v) => v.userId === parseInt(session?.user.id || "0"),
    );
    if (userVote) {
      setIsUpvoted(userVote.isUpvote);
      setIsDownvoted(!userVote.isUpvote);
    } else {
      setIsUpvoted(false);
      setIsDownvoted(false);
    }
  }, [post.Vote, session?.user]);

  const handleUpvote = async () => {
    if (isUpvoted) {
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
      setUpvote(upvote - 1);
      setIsUpvoted(false);
      setIsDownvoted(false);
      return;
    }

    if (isDownvoted) setUpvote(upvote + 1);

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
    setUpvote((prev) => prev + 1);
    setIsUpvoted(true);
    setIsDownvoted(false);
  };

  const handleDownvote = async () => {
    if (isDownvoted) {
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
      setUpvote(upvote + 1);
      setIsDownvoted(false);
      setIsUpvoted(false);
      return;
    }

    if (isUpvoted) setUpvote(upvote - 1);

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
    setUpvote((prev) => prev - 1);
    setIsDownvoted(true);
    setIsUpvoted(false);
    return;
  };

  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-200 p-1 hover:bg-gray-300">
      <button
        onClick={handleUpvote}
        className={`${isUpvoted && "text-blue-500"} rounded-lg border border-transparent hover:border-gray-400`}
      >
        <ArrowUpShort size={20} />
      </button>
      <p>{upvote}</p>
      <button
        onClick={handleDownvote}
        className={`${isDownvoted && "text-red-500"} rounded-lg border border-transparent hover:border-gray-400`}
      >
        <ArrowDownShort size={20} />
      </button>
    </div>
  );
};

export default UpvoteButton;
