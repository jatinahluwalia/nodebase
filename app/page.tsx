import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Client } from "@/components/ui/client";
import { caller, getQueryClient, trpc } from "@/trpc/server";

const Page = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "Jatin" }));

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={"loading..."}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
