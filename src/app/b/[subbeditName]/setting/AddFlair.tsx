import Skeleton from "@/app/components/elements/Skeleton";
import { Flair } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface AddFlairProps {
  subbeditName: string;
}

const AddFlair: React.FC<AddFlairProps> = ({ subbeditName }) => {
  const queryClient = useQueryClient();

  const addFlair = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const flair = e.currentTarget.flair.value;

    await (
      await fetch(`/api/subbedit/${subbeditName}/flair`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: flair,
          description: "A new flair",
          color: e.currentTarget.color.value,
        }),
      })
    ).json();

    queryClient.invalidateQueries({
      queryKey: ["subbeditFlairs", { subbeditName }],
    });
  };

  const removeFlair = async (flairId: number) => {
    await (
      await fetch(`/api/subbedit/${subbeditName}/flair`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flairId,
        }),
      })
    ).json();
  };

  const { data: flairs, isLoading } = useQuery<Flair[]>({
    queryFn: () =>
      fetch(`/api/subbedit/${subbeditName}/flair`).then((res) => res.json()),
    queryKey: ["subbeditFlairs", { subbeditName }],
  });

  const { mutateAsync: removeFlairMutation } = useMutation({
    mutationFn: (flairId: number) => removeFlair(flairId),
    onSuccess: (_, flairId) => {
      queryClient.setQueryData<Flair[]>(
        ["subbeditFlairs", { subbeditName }],
        (oldFlairs) => {
          return oldFlairs?.filter((flair) => flair.id !== flairId) || [];
        },
      );
    },
    mutationKey: ["removeFlair", subbeditName],
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg">Add flair</h3>
      <form onSubmit={addFlair} className="flex gap-2">
        <input
          type="text"
          name="flair"
          placeholder="Enter new Flair"
          className="rounded bg-gray-300 p-1"
        />
        <button type="submit">Submit</button>
        <input type="color" name="color" defaultValue="#ffffff" />
      </form>
      <div className="flex flex-wrap gap-2 rounded-md bg-gray-200 p-2">
        {isLoading
          ? Array.from({ length: 30 }, (_, i) => (
              <Skeleton key={i} height={24} width={80} />
            ))
          : flairs?.map((flair) => (
              <div
                key={flair.id}
                style={{ backgroundColor: flair.color }}
                className="flex gap-2 rounded p-1"
              >
                <p className="">
                  {flair.name}{" "}
                  <button
                    onClick={async () => await removeFlairMutation(flair.id)}
                  >
                    x
                  </button>
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AddFlair;
