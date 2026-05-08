const Page = async ({ params }: PageProps<"/workflows/[workflowId]">) => {
  const { workflowId } = await params;
  return <div>Page</div>;
};

export default Page;
