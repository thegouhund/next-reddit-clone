"use client";

import axios from "@configs/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const FormNewPost = ({ params }: { params: { subbeditName: string } }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      console.error("User not logged in");
      return;
    }

    if (!title || !content) {
      console.error("Title and content are required");
      return;
    }
    console.log(session);
    const response = await axios.post(`/subbedit/${params.subbeditName}/post`, {
      title,
      body: content,
    });
    console.log(response.data);
    router.back();
  };

  return (
    <div className="w-full">
      <p>Create a new post at b/{params.subbeditName}</p>
      <div className="flex">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <input
            placeholder="Title"
            type="text"
            id="title"
            name="title"
            className="w-full rounded bg-slate-300 p-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            id="content"
            name="content"
            className="rounded bg-slate-300 p-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button className="rounded bg-orange-400 p-4" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormNewPost;
