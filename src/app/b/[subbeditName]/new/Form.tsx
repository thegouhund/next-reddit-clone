import { UploadButton } from "@/app/components/elements/UploadThing";
import MDEditor from "@uiw/react-md-editor";
import React, { useCallback } from "react";

interface FormProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  selectedPostType: "text" | "media";
  setMediaUrl: (url: string | null) => void;
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  content,
  selectedPostType,
  setContent,
  setTitle,
  title,
  setMediaUrl,
}) => {
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle],
  );

  const handleContentChange = useCallback(
    (value: string | undefined) => {
      setContent(value || "");
    },
    [setContent],
  );

  return (
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
        <>
          {/* Causing hydration error */}
          <MDEditor
            height={400}
            value={content}
            onChange={handleContentChange}
            autoCapitalize="off"
          />
        </>
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
  );
};

export default Form;
