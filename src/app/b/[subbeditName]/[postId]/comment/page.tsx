"use client";

import Skeleton from "@/app/components/elements/Skeleton";
import { CommentWithUser } from "@/app/types/comment";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import { useQuery } from "@tanstack/react-query";
import { JSX, use, useCallback, useMemo, useState } from "react";
import Comment from "./Comment";
import PostDetail from "./PostDetail";

type Params = Promise<{ subbeditName: string; postId: number }>;

const CommentPage = ({ params }: { params: Params }) => {
  const { subbeditName, postId } = use(params);
  // const [post, setPost] = useState<PostWithUserAndSubbedit>();
  const [comments, setComments] = useState<CommentWithUser[]>([]);

  const addComment = useCallback((comment: CommentWithUser) => {
    setComments((prevComments) => [...prevComments, comment]);
  }, []);

  const renderComments = useCallback(
    (
      comments: CommentWithUser[],
      parentId: number | null = null,
      indentation: number = 0,
    ): JSX.Element[] => {
      return comments
        .filter((comment) => comment.parentCommentId === parentId)
        .map((comment) => (
          <div key={comment.id}>
            <Comment
              comment={comment}
              indentation={indentation}
              postId={postId}
              addComment={addComment}
            />
            {renderComments(comments, comment.id, indentation + 20)}
          </div>
        ));
    },
    [postId, addComment],
  );
  const memoizedComments = useMemo(
    () => renderComments(comments),
    [comments, renderComments],
  );

  const { data: post, isLoading } = useQuery<PostWithUserAndSubbedit>({
    queryFn: async () => {
      const res = await fetch(`/api/subbedit/${subbeditName}/post/${postId}`);
      const data = await res.json();
      setComments(data.Comment);
      return data;
    },
    queryKey: ["subbeditPosts"],
  });

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton width={40} height={40} isRound />
          <Skeleton width={80} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Skeleton />
          <Skeleton width={"80%"} />
          <br />
          <Skeleton width={"90%"} />
          <Skeleton width={"90%"} />
          <Skeleton width={"90%"} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-2">
        {post && <PostDetail post={post} addComment={addComment} />}
        <div className="flex flex-col gap-3">{memoizedComments}</div>
      </div>
    </div>
  );
};
export default CommentPage;
