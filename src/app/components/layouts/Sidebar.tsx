"use client";
import useSubbedit from "@/app/hooks/useSubbedit";
import { Cake, Globe } from "react-bootstrap-icons";
import JoinSubbeditButton from "../elements/JoinSubbeditButton";
import { useState } from "react";
import CreateSubbedit from "../elements/Popup/CreateSubbedit";

const SidebarWithoutSubbedit = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-xl font-bold">Welcome to beddit!!</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam,
        enim.
      </p>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-400 p-2 font-bold text-white"
      >
        Create a Subbedit!
      </button>
      <CreateSubbedit isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const Sidebar = () => {
  const { subbedit } = useSubbedit();

  return (
    <aside className="sticky top-4 h-[calc(95vh-4rem)] w-[350px] overflow-y-auto rounded-lg p-4 max-[900px]:hidden dark:bg-gray-800">
      {!subbedit?.name && <SidebarWithoutSubbedit />}
      {subbedit?.name && !subbedit && (
        <div className="flex w-full animate-pulse flex-col gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`h-${index === 0 ? "6" : "10"} w-${index === 1 ? "full" : "3/4"} rounded bg-gray-300`}
            ></div>
          ))}
        </div>
      )}
      {subbedit && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-xl font-bold">About b/{subbedit.name}</h2>
          <p className="text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Laboriosam, enim.
          </p>
          <div>
            <InfoItem
              icon={<Cake size={18} />}
              text={`Created: ${new Date(subbedit.createdAt).toLocaleDateString()}`}
            />
            <InfoItem icon={<Globe size={18} />} text="Public" />
            <br />
            <div className="flex items-center justify-between gap-4">
              <StatItem label="Members" value="100K" />
              <StatItem label="Online" value="100K" />
              <StatItem label="SomeText" value="100K" />
            </div>
          </div>
          <JoinSubbeditButton subbeditName={subbedit.name} />
        </div>
      )}
    </aside>
  );
};

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-1">
    {icon}
    <p>{text}</p>
  </div>
);

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    {label}
    <p className="text-gray-500">{value}</p>
  </div>
);
export default Sidebar;
