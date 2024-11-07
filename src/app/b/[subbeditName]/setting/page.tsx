"use client";

import { use } from "react";
import AddModerator from "./AddModerator";
import AddFlair from "./AddFlair";

type Params = Promise<{ subbeditName: string }>;

const SettingPage = ({ params }: { params: Params }) => {
  const { subbeditName } = use(params);

  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-2xl font-bold">Setting b/{subbeditName}</h1>
      <AddModerator subbeditName={subbeditName} />
      <AddFlair subbeditName={subbeditName} />
    </div>
  );
};

export default SettingPage;
