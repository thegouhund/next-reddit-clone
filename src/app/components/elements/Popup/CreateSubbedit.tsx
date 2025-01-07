import { usePathname } from "next/navigation";
import React from "react";

interface CreateSubbeditProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateSubbedit: React.FC<CreateSubbeditProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const pathname = usePathname();

  const addSubbedit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    const data = await (
      await fetch("/api/subbedit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      })
    ).json();

    console.log(data);
    setIsOpen(false);

    const newPathname = `/b/${name}`;
    if (pathname !== newPathname) {
      window.location.replace(newPathname);
    }
  };

  if (isOpen)
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative w-96 rounded-lg bg-white p-8 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute right-6 top-6 text-2xl text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
          <form onSubmit={addSubbedit} className="mt-4 flex flex-col">
            <p>Subbedit Name:</p>
            <div className="flex items-center gap-1">
              <span>b/</span>
              <input
                type="text"
                name="name"
                className="w-full rounded border p-1 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-4 rounded bg-blue-400 p-2 text-sm text-white"
            >
              Create Subreddit
            </button>
          </form>
        </div>
      </div>
    );
};

export default CreateSubbedit;
