import React from "react";

const TabContent = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <p className="cursor-pointer rounded-lg rounded-b-none border-l-2 border-r-2 border-t-2 bg-slate-200 px-2 text-lg transition-all hover:bg-slate-200 hover:text-blue-500">
        {title}
      </p>
      {children}
    </>
  );
};

export default TabContent;
