import Skeleton from "@/app/components/elements/Skeleton";
import { Flair } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface AddFlairProps {
  subbeditName: string;
}

const AddFlair: React.FC<AddFlairProps> = ({ subbeditName }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg">Add flair</h3>
      <NewFlairForm subbeditName={subbeditName} />
      <FlairList subbeditName={subbeditName} />
    </div>
  );
};

interface NewFlairFormProps {
  subbeditName: string;
}

const NewFlairForm: React.FC<NewFlairFormProps> = ({ subbeditName }) => {
  const queryClient = useQueryClient();
  const [newFlairName, setNewFlairName] = useState<string>("");
  const [newFlairColor, setNewFlairColor] = useState<string>("#ffffff");

  const addFlair = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`/api/subbedit/${subbeditName}/flair`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newFlairName,
        description: "A new flair",
        color: newFlairColor,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(await response.json());

    queryClient.invalidateQueries({
      queryKey: ["subbeditFlairs", { subbeditName }],
    });

    setNewFlairName("");
    setNewFlairColor("#ffffff");
  };

  return (
    <>
      <form onSubmit={addFlair} className="flex gap-2">
        <input
          type="text"
          value={newFlairName}
          onChange={(e) => setNewFlairName(e.target.value)}
          placeholder="Enter new Flair"
          className="rounded bg-gray-300 p-1 dark:bg-primary"
        />
        <input
          type="color"
          value={newFlairColor}
          onChange={(e) => setNewFlairColor(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

interface FlairListProps {
  subbeditName: string;
}

const FlairList: React.FC<FlairListProps> = ({ subbeditName }) => {
  const queryClient = useQueryClient();

  const { data: flairs, isLoading } = useQuery<Flair[]>({
    queryFn: () =>
      fetch(`/api/subbedit/${subbeditName}/flair`).then((res) => res.json()),
    queryKey: ["subbeditFlairs", { subbeditName }],
  });

  const removeFlair = async (flairId: number) => {
    await fetch(`/api/subbedit/${subbeditName}/flair`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flairId,
      }),
    });
  };

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
    <div className="flex flex-wrap gap-2 rounded-md bg-gray-200 p-2 dark:bg-primary">
      {isLoading ? (
        Array.from({ length: 30 }, (_, i) => (
          <Skeleton key={i} height={24} width={80} />
        ))
      ) : flairs && flairs.length > 0 ? (
        flairs.map((flair) => (
          <div
            key={flair.id}
            style={{ backgroundColor: flair.color }}
            className="flex gap-2 rounded p-1"
          >
            <p className="">
              {flair.name}{" "}
              <button onClick={async () => await removeFlairMutation(flair.id)}>
                x
              </button>
            </p>
          </div>
        ))
      ) : (
        <p>No flairs available</p>
      )}
    </div>
  );
};

export default AddFlair;
