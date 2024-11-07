import { User, UserSubbedit } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Member from "./Member";

interface AddModeratorProps {
  subbeditName: string;
}

const AddModerator: React.FC<AddModeratorProps> = ({ subbeditName }) => {
  const [members, setMembers] = useState<(UserSubbedit & { User: User })[]>([]);

  useEffect(() => {
    const fetchSubbeditMembers = async () => {
      const data = await (
        await fetch(`/api/subbedit/${subbeditName}/member`)
      ).json();
      console.log(data);
      setMembers(data);
    };

    fetchSubbeditMembers();
  }, [subbeditName]);

  return (
    <div className="">
      <h3 className="text-lg">Add moderator</h3>
      <div className="flex flex-wrap gap-2 rounded-md bg-gray-300 p-2">
        {members.map((member) => (
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
