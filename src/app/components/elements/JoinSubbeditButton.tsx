import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface JoinSubbeditButtonProps {
  subbeditName: string;
  onJoined?: () => void;
}

const JoinSubbeditButton: React.FC<JoinSubbeditButtonProps> = ({
  subbeditName,
  onJoined,
}) => {
  const { data: session } = useSession();
  const [isJoined, setIsJoined] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      const joined = session.user.subbedits.some(
        (subbedit) => subbedit.name === subbeditName,
      );
      setIsJoined(joined);
    }
  }, [subbeditName, session]);

  const handleJoinSubbedit = async () => {
    const data = await (
      await fetch(`/api/subbedit/${subbeditName}/join`, {
        method: "POST",
      })
    ).json();

    console.log(data);
    if (data) {
      onJoined?.();
      setIsJoined(true);
    }
  };

  return (
    <button onClick={handleJoinSubbedit} className={isJoined ? "hidden" : ""}>
      <p className="rounded bg-blue-400 p-2 font-bold text-white transition-all hover:bg-blue-300">
        + Join
      </p>
    </button>
  );
};

export default JoinSubbeditButton;
