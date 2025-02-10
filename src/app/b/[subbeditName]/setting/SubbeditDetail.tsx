import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Subbedit } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

type SubbeditDetailProps = {
  subbeditName: string;
};

const SubbeditDetail: React.FC<SubbeditDetailProps> = ({ subbeditName }) => {
  const queryClient = useQueryClient();
  const { data: subbedit, isLoading } = useQuery<Subbedit>({
    queryFn: () =>
      fetch(`/api/subbedit/${subbeditName}/`).then((res) => res.json()),
    queryKey: ["subbedit", subbeditName],
  });

  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");

  useEffect(() => {
    if (subbedit) {
      setDescription(subbedit.description ?? "");
      setRules(subbedit.rules ?? "");
    }
  }, [subbedit]);

  const updateSubbedit = async (updatedData: Partial<Subbedit>) => {
    const response = await fetch(`/api/subbedit/${subbeditName}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: updateSubbedit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subbedit", subbeditName] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ description, rules });
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3 className="text-lg">Description</h3>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="rounded-lg bg-gray-300 p-1 dark:bg-gray-900"
        />
      </div>
      <div>
        <h3 className="text-lg">Rules</h3>
        <Textarea
          id="rules"
          value={rules}
          onChange={(e) => setRules(e.target.value)}
          rows={5}
          className="rounded-lg bg-gray-300 p-1 dark:bg-gray-900"
        />
      </div>
      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Save Changes"}
      </Button>
      {mutation.isError && (
        <div>An error occurred: {mutation.error.message}</div>
      )}
      {mutation.isSuccess && <div>Subbedit updated successfully!</div>}
    </form>
  );
};

export default SubbeditDetail;
