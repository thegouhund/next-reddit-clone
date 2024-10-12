import { Subbedit } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Cake, Globe } from "react-bootstrap-icons";

const SidebarContent = ({ subbeditName }: { subbeditName: string }) => {
  const [subbedit, setSubbedit] = useState<Subbedit | null>(null);

  useEffect(() => {
    const fetchSubbedit = async () => {
      try {
        const data = await fetch(`/api/subbedit/${subbeditName}`, {
          cache: "force-cache",
        });
        const response = await data.json();
        setSubbedit(response);
      } catch (error) {
        console.error("Error fetching subbedit:", error);
      }
    };

    fetchSubbedit();
  }, [subbeditName]);

  if (!subbedit) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-xl font-bold">About b/{subbedit.name}</h2>
      <p className="text-gray-600">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam,
        enim.
      </p>
      <div>
        <div className="flex items-center gap-1">
          <Cake size={18} />
          <p>Created: {new Date(subbedit.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-1">
          <Globe size={18} />
          <p>Public</p>
        </div>

        <br />

        <div className="flex items-center justify-between gap-4">
          <div>
            Members
            <p className="text-gray-500">100K</p>
          </div>
          <div>
            Online
            <p className="text-gray-500">100K</p>
          </div>
          <div>
            SomeText
            <p className="text-gray-500">100K</p>
          </div>
        </div>
      </div>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
        Join
      </button>
    </div>
  );
};

export default SidebarContent;
