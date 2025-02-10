"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import Form from "./Form";
import Options from "./Options";

type Params = Promise<{ subbeditName: string }>;

const FormNewPost = ({ params }: { params: Params }) => {
  const { subbeditName } = use(params);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const [selectedPostType, setSelectedPostType] = useState<"text" | "media">(
    "text",
  );
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [selectedFlair, setSelectedFlair] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      console.error("User not logged in");
      return;
    }

    if (!title) {
      console.error("Title required");
      return;
    }

    const data = await (
      await fetch(`/api/subbedit/${subbeditName}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body: content,
          mediaUrl: mediaUrl,
          flairId: selectedFlair,
        }),
      })
    ).json();

    console.log(data);
    router.back();
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-lg font-semibold">
        Create a new post at b/{subbeditName}
      </h2>
      <Options
        selectedPostType={selectedPostType}
        setSelectedPostType={setSelectedPostType}
        selectedFlair={selectedFlair}
        setSelectedFlair={setSelectedFlair}
        setMediaUrl={setMediaUrl}
      />
      <Form
        setTitle={setTitle}
        setContent={setContent}
        setMediaUrl={setMediaUrl}
        content={content}
        title={title}
        selectedPostType={selectedPostType}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormNewPost;
