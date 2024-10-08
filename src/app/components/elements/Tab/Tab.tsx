import React from "react";

const Tab = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-4 hidden gap-1 border-b-2 max-[900px]:flex">
      {children}
    </div>
  );
};

export default Tab;
