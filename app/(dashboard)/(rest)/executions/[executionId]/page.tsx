import { requireAuth } from "@/lib/auth-utils";

const Page = async ({ params }: PageProps<"/executions/[executionId]">) => {
  await requireAuth();
  const { executionId } = await params;
  return <div>Page</div>;
};

export default Page;
