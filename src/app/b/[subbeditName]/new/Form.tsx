import { UploadButton } from "@/app/components/elements/UploadThing";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import React, { useCallback, useState } from "react";

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
  const [isValid, setIsValid] = useState<boolean>(false);

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
        className="w-full rounded-lg bg-gray-300 p-4 dark:bg-gray-800 outline-none"
        value={title}
        onChange={handleTitleChange}
      />

      {selectedPostType === "text" ? (
        <>
          {/* Causing hydration error */}
          {/* <MDEditor
            height={400}
            value={content}
            onChange={handleContentChange}
            autoCapitalize="off"
          /> */}

          <textarea
            placeholder="Content"
            id="content"
            name="content"
            className="w-full resize rounded-lg bg-gray-300 p-4 dark:bg-gray-800 outline-none"
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
          />
        </>
      ) : (
        <UploadButton
          className="h-[200px] w-full rounded-lg dark:bg-gray-800"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            alert(res[0].url);
            setMediaUrl(res[0].url);
            setIsValid(true);
          }}
        />
      )}
      <div className="flex justify-end">
        <Button
          className="bg-blue-400 text-white hover:bg-blue-500"
          disabled={!isValid}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
