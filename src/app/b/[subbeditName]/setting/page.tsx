"use client";

import { use, useState } from "react";
import AddModerator from "./AddModerator";
import AddFlair from "./AddFlair";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Subbedit } from "@prisma/client";
import SubbeditDetail from "./SubbeditDetail";

type Params = Promise<{ subbeditName: string }>;

const SettingPage = ({ params }: { params: Params }) => {
  const { subbeditName } = use(params);

  return (
    <div className="flex h-fit w-full flex-col gap-2 rounded-lg bg-secondary p-4">
      <h1 className="mb-2 text-2xl font-bold">
        Subreddit Settings: b/{subbeditName}
      </h1>
      <AddModerator subbeditName={subbeditName} />
      <AddFlair subbeditName={subbeditName} />
      <SubbeditDetail subbeditName={subbeditName} />
    </div>
  );
};

export default SettingPage;
