import React from "react";

interface SkeletonProps {
  height?: number;
  width?: number | string;
  isRound?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = 24,
  width,
  isRound = false,
}) => {
  return (
    <div
      style={{
        height,
        width: width || "100%",
        backgroundColor: "lightgray",
        borderRadius: isRound ? "100%" : undefined,
      }}
      className="animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
    ></div>
  );
};

export default Skeleton;
