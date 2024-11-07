import { Role, User } from "@prisma/client";
import React, { useState } from "react";

interface MemberProps {
  user: User;
  currentRole: Role;
  subbeditName: string;
}

const Member: React.FC<MemberProps> = ({ user, currentRole, subbeditName }) => {
  const [role, setRole] = useState<Role>(currentRole);

  const toggleRole = async () => {
    const newRole = role === Role.MEMBER ? Role.MODERATOR : Role.MEMBER;
    const data = await (
      await fetch(`/api/subbedit/${subbeditName}/member`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          role: newRole,
        }),
      })
    ).json();

    console.log(data);
    setRole(newRole);
  };

  return (
    <button
      onClick={toggleRole}
      key={user.id}
      className="flex items-center gap-2 rounded bg-white p-1"
    >
      <p>
        {user.username} {role === Role.MEMBER ? "+" : "x"}
      </p>
    </button>
  );
};

export default Member;
