"use client";
import useSidebar from "@hooks/useSidebar";

const Sidebar = () => {
  const { sidebar } = useSidebar();
  return (
    <aside className="sticky top-4 h-[calc(95vh-4rem)] w-[350px] overflow-y-auto rounded border border-gray-400 p-4 max-[900px]:hidden">
      {sidebar}
    </aside>
  );
};

export default Sidebar;
