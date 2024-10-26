"use client";

import { CommentWithUser } from "@/app/types/comment";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import { JSX, use, useCallback, useEffect, useMemo, useState } from "react";
import Comment from "./Comment";
import PostDetail from "./PostDetail";

type Params = Promise<{ subbeditName: string; postId: number }>;

const CommentPage = ({ params }: { params: Params }) => {
  const { subbeditName, postId } = use(params);
  const [post, setPost] = useState<PostWithUserAndSubbedit>();
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

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `/api/subbedit/${subbeditName}/post/${postId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      console.log(data);
      setPost(data);
      setComments(data.Comment);
    };

    fetchPost();
  }, [subbeditName, postId]);

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
