import useSubbedit from "@/app/hooks/useSubbedit";
import React from "react";

interface OptionsProps {
  selectedPostType: "text" | "media";
  setSelectedPostType: (type: "text" | "media") => void;
  selectedFlair: string | null;
  setSelectedFlair: (flair: string | null) => void;
  setMediaUrl: (url: string | null) => void;
}

const Options: React.FC<OptionsProps> = ({
  selectedFlair,
  setMediaUrl,
  selectedPostType,
  setSelectedFlair,
  setSelectedPostType,
}) => {
  const { subbedit } = useSubbedit();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          setSelectedPostType("text");
          setMediaUrl(null);
        }}
        className={`${selectedPostType === "text" ? "bg-blue-400" : "bg-gray-400 dark:bg-gray-800"} rounded-md px-2 text-black dark:text-white`}
      >
        Text
      </button>
      <button
        onClick={() => setSelectedPostType("media")}
        className={`${selectedPostType === "media" ? "bg-blue-400" : "bg-gray-400 dark:bg-gray-800"} rounded-md px-2 text-black dark:text-white`}
      >
        Media
      </button>
      {subbedit?.Flair && subbedit.Flair.length > 0 && (
        <select
          className="rounded border bg-transparent px-2 py-1"
          value={selectedFlair || ""}
          onChange={(e) => setSelectedFlair(e.target.value || null)}
        >
          <option value="" disabled>
            Choose a flair
          </option>
          <option value="">No flair</option>
          {subbedit.Flair.map((flair, i) => (
            <option key={i} value={flair.id}>
              {flair.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Options;
