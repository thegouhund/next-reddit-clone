"use client"

import { CommentModel, PostModel } from '@/app/types/model';
import React, { FC, useState } from 'react'
import axios from '@configs/axios';
import Comment from './Comment';
import postImg from "@public/post-img-example.png"
import Image from 'next/image';

interface PostDetailProps {
    post: PostModel;
    comments: CommentModel[];
}

const PostDetail: FC<PostDetailProps> = ({ post, comments }): JSX.Element => {
    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = async () => {
        const response = await axios.post(`/subbedit/${post.Subbedit.name}/post/${post.id}/comment`, {
            body: commentText,
            userId: 1,
        });
        console.log(response.data);
        console.log(post)
        setCommentText('');
    
        window.location.reload();
    };

    const renderComments = (comments: CommentModel[], parentId: number | null = null, indentation: number = 0) => {
        return comments
            .filter(comment => comment.parentCommentId === parentId)
            .map(comment => (
                <div key={comment.id}>
                    <Comment
                        comment={comment}
                        indentation={indentation}
                        postId={post.id}
                    />
                    {renderComments(comments, comment.id, indentation + 20)}
                </div>
            ));
    };

    return (
        <div className='flex flex-col gap-4 w-full'>
            <h1 className="text-2xl font-extrabold">{post.title}</h1>
            <Image src={postImg} alt="Image Post" width={600} className="rounded-lg" />
            <h3 className="text-base font-medium">{post.body}</h3>

            <div className='flex gap-4'>
                <textarea
                    className='w-full bg-slate-300 rounded-lg p-2'
                    placeholder="Add a comment"
                    name="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button className='' onClick={handleCommentSubmit}>Comment</button>
            </div>
            <div className='flex flex-col gap-1'>
                {renderComments(comments)}
            </div>
        </div>
    )
}

export default PostDetail