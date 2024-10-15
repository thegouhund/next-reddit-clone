"use client";

import { CommentWithUser } from "@/app/types/comment";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import { FC, useCallback, useEffect, useState } from "react";
import Comment from "./Comment";
import PostDetail from "./PostDetail";

interface CommentPageProps {
  params: { subbeditName: string; postId: number };
}

const CommentPage: FC<CommentPageProps> = ({
  params: { subbeditName, postId },
}) => {
  const [post, setPost] = useState<PostWithUserAndSubbedit>();
  const [comments, setComments] = useState<CommentWithUser[]>([]);

  const addComment = (comment: CommentWithUser) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const renderComments = useCallback(
    (
      comments: CommentWithUser[],
      parentId: number | null = null,
      indentation: number = 0,
    ) => {
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
    [postId],
  );

  useEffect(() => {
    const fetchPost = async () => {
      const data = await (
        await fetch(`/api/subbedit/${subbeditName}/post/${postId}`)
      ).json();
      console.log(data);
      setPost(data);
      setComments(data.Comment);
    };

    fetchPost();
  }, [subbeditName, postId]);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-4">
        {post && <PostDetail post={post} addComment={addComment} />}
        <div className="flex flex-col gap-3">{renderComments(comments)}</div>
      </div>
    </div>
  );
};

export default CommentPage;
