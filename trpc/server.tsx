/** biome-ignore-all lint/suspicious/noExplicitAny: required any here in prefetch function*/
import "server-only";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createTRPCOptionsProxy,
  type TRPCQueryOptions,
} from "@trpc/tanstack-react-query";
import type React from "react";
import { cache } from "react";
import { createTRPCContext } from "@/trpc/init";
import { makeQueryClient } from "@/trpc/query-client";
import { appRouter } from "@/trpc/routers/_app";

export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
export const caller = appRouter.createCaller(createTRPCContext);

export const HydrateClient = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export const prefetch = <T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) => {
  const queryClient = getQueryClient();

  if (queryOptions.queryKey[1]?.type === "infinite") {
    queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    queryClient.prefetchQuery(queryOptions);
  }
};
