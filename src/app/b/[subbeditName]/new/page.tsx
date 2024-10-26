"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import MDEditor from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use, useCallback, useState } from "react";
import { generateUploadButton } from "@uploadthing/react";

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

  const UploadButton = generateUploadButton<OurFileRouter>();

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
        }),
      })
    ).json();

    console.log(data);
    router.back();
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const handleContentChange = useCallback((value: string | undefined) => {
    setContent(value || "");
  }, []);

  return (
    <div className="w-full">
      <p>Create a new post at b/{subbeditName}</p>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setSelectedPostType("text");
            setMediaUrl(null);
          }}
          className={`${selectedPostType === "text" && "bg-blue-400 text-white"} rounded-lg border px-2 text-black`}
        >
          Text
        </button>
        <button
          onClick={() => setSelectedPostType("media")}
          className={`${selectedPostType === "media" && "bg-blue-400 text-white"} rounded-lg border px-2 text-black`}
        >
          Media
        </button>
      </div>
      <div className="flex">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <input
            placeholder="Title"
            type="text"
            id="title"
            name="title"
            className="w-full rounded bg-slate-300 p-4"
            value={title}
            onChange={handleTitleChange}
          />

          {selectedPostType === "text" ? (
            <div data-color-mode="light">
              <MDEditor
                height={400}
                value={content}
                onChange={handleContentChange}
              />
            </div>
          ) : (
            <UploadButton
              className="h-[200px] w-full"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                alert(res[0].url);
                setMediaUrl(res[0].url);
              }}
            />
          )}
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
