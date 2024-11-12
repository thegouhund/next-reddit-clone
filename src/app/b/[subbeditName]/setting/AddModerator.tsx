import Skeleton from "@/app/components/elements/Skeleton";
import { User, UserSubbedit } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Member from "./Member";

interface AddModeratorProps {
  subbeditName: string;
}

const AddModerator: React.FC<AddModeratorProps> = ({ subbeditName }) => {
  const { data: members, isLoading } = useQuery<
    (UserSubbedit & { User: User })[]
  >({
    queryFn: () =>
      fetch(`/api/subbedit/${subbeditName}/member`).then((res) => res.json()),
    queryKey: ["subbeditMembers", subbeditName],
  });

  return (
    <div className="">
      <h3 className="text-lg">Add moderator</h3>
      <div className="flex flex-wrap items-center gap-2 rounded-md bg-gray-200 p-2">
        {isLoading
          ? Array.from({ length: 10 }, (_, i) => (
              <Skeleton key={i} height={30} width={80} />
            ))
          : members?.map((member) => (
              <Member
                key={member.id}
                user={member.User}
                currentRole={member.role}
                subbeditName={subbeditName}
              />
            ))}
      </div>
    </div>
  );
};

export default AddModerator;
