"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

const Page = () => {
  const trpc = useTRPC();
  const testAI = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: () => {
        toast.success("success");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    }),
  );
  return (
    <div>
      <Button onClick={() => testAI.mutate()}>
        Click to test subscription
      </Button>
    </div>
  );
};

export default Page;
