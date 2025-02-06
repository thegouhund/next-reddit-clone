import { Role, User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface MemberProps {
  user: User;
  currentRole: Role;
  subbeditName: string;
}

const Member: React.FC<MemberProps> = ({ user, currentRole, subbeditName }) => {
  const queryClient = useQueryClient();
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

  const { mutateAsync: toggleRoleMutation } = useMutation({
    mutationFn: () => toggleRole(),
    onSuccess: () => {
      queryClient.setQueryData<Role>(
        ["subbeditMembers", { subbeditName }],
        (oldRole) => {
          return oldRole === Role.MODERATOR ? Role.MEMBER : Role.MODERATOR;
        },
      );
    },
    mutationKey: ["removeFlair", subbeditName],
  });

  return (
    <button
      onClick={async () => await toggleRoleMutation()}
      key={user.id}
      className={`${role == Role.CREATOR && "bg-yellow-400"} flex items-center gap-2 rounded bg-white p-1`}
    >
      <p>
        {user.username}
        {role === Role.MEMBER ? "+" : role === Role.MODERATOR ? "x" : ""}
      </p>
    </button>
  );
};

export default Member;
