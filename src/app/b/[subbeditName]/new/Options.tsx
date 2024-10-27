import React from "react";

interface OptionsProps {
  selectedPostType: "text" | "media";
  setSelectedPostType: (type: "text" | "media") => void;
  selectedFlair: string;
  setSelectedFlair: (flair: string) => void;
  setMediaUrl: (url: string | null) => void;
}

const Options: React.FC<OptionsProps> = ({
  selectedFlair,
  setMediaUrl,
  selectedPostType,
  setSelectedFlair,
  setSelectedPostType,
}) => {
  return (
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
      <div className="">
        <select
          className="rounded border bg-transparent px-2 py-1"
          value={selectedFlair}
          onChange={(e) => setSelectedFlair(e.target.value)}
        >
          <option value="" disabled>
            Choose a flair
          </option>
          <option value="Help">Help</option>
          <option value="Humour">Humour</option>
          <option value="Text">Text</option>
        </select>
      </div>
    </div>
  );
};

export default Options;
