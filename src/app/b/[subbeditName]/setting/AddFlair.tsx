import { Flair } from "@prisma/client";
import React, { useEffect } from "react";

interface AddFlairProps {
  subbeditName: string;
}

const AddFlair: React.FC<AddFlairProps> = ({ subbeditName }) => {
  const [flairs, setFlairs] = React.useState<Flair[]>([]);

  const addFlair = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const flair = e.currentTarget.flair.value;

    const data = await (
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

    console.log(data);
    setFlairs([...flairs, data]);
  };

  const removeFlair = async (flairId: number) => {
    const data = await (
      await fetch(`/api/subbedit/${subbeditName}/flair`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flairId,
        }),
      })
    ).json();

    console.log(data);

    setFlairs((prevFlairs) =>
      prevFlairs.filter((flair) => flair.id !== flairId),
    );
  };

  useEffect(() => {
    const fetchSubbeditFlairs = async () => {
      const data = await (
        await fetch(`/api/subbedit/${subbeditName}/flair`, {})
      ).json();
      console.log(data);
      setFlairs(data);
    };

    fetchSubbeditFlairs();
  }, [subbeditName]);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg">Add flair</h3>
      <form onSubmit={addFlair} className="flex gap-2">
        <input
          type="text"
          name="flair"
          placeholder="Enter new Flair"
          className="bg-gray-300 rounded"
        />
        <button type="submit">Submit</button>
        <input type="color" name="color" id="" />
      </form>
      <div className="flex flex-wrap justify-evenly gap-2 rounded-md bg-gray-300 p-2">
        {flairs.map((flair) => {
          return (
            <div
              key={flair.id}
              style={{ backgroundColor: flair.color }}
              className="flex gap-2 rounded p-1"
            >
              <p className="">
                {flair.name}{" "}
                <button onClick={() => removeFlair(flair.id)}>x</button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddFlair;
