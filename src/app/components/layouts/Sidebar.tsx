"use client";
import useSidebar from "@hooks/useSidebar";

const Sidebar = () => {
  const { sidebar } = useSidebar();
  return (
    <aside className="h-full w-[300px] min-w-[200px] rounded border border-gray-400 p-4 max-[900px]:hidden">
      {sidebar}
    </aside>
  );
};

export default Sidebar;
