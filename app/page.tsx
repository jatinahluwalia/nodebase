"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

const Page = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    }),
  );

  const testAI = useMutation(trpc.testAI.mutationOptions());

  return (
    <div>
      {JSON.stringify(data)}
      <Button
        type="button"
        disabled={create.isPending}
        onClick={() => create.mutate()}
      >
        Create
      </Button>
      <Button onClick={() => testAI.mutate()}>Test AI</Button>
      {JSON.stringify(testAI.data)}
    </div>
  );
};

export default Page;
