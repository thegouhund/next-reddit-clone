"use client";
import { Subbedit } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Cake, Globe } from "react-bootstrap-icons";

const Sidebar = () => {
  const [subbedit, setSubbedit] = useState<Subbedit | null>(null);
  const pathname = usePathname();
  const subbeditName = useMemo(() => {
    return (
      pathname.match(/\/b\/([^\/]+)(?:\/[a-z0-9]+(?:\/.*)?)?/)?.[1] || null
    );
  }, [pathname]);

  useEffect(() => {
    const fetchSubbedit = async () => {
      if (!subbeditName) return;
      try {
        const response = await fetch(`/api/subbedit/${subbeditName}`, {
          cache: "force-cache",
        });
        if (!response.ok) throw new Error("Failed to fetch subbedit");
        const data = await response.json();
        setSubbedit(data);
      } catch (error) {
        console.error("Error fetching subbedit:", error);
      }
    };

    fetchSubbedit();
  }, [subbeditName]);

  return (
    <aside className="sticky top-4 h-[calc(95vh-4rem)] w-[350px] overflow-y-auto rounded border border-gray-400 p-4 max-[900px]:hidden">
      {!subbeditName && <div>Welcome to beddit!!</div>}
      {subbeditName && !subbedit && (
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
          <p className="text-gray-600">
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
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
            Join
          </button>
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
